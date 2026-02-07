FUNCTION ekyatirim(p_polid police.polid%type, p_borctip odeplan.borctip%type, p_tutar tahsmaster.tutar%type, p_seq tahsmaster.seq%type, 
                   p_tmodetar tahsmaster.kayittar%type, p_tmfistar tahsmaster.fistar%type, p_aciklama tahsmaster.aciklama%type, p_vadetar tahsilat.vadetar%type, 
                   p_odepid tahsilat.odepid%type, p_periyot number, p_kartno varchar2, p_poldovkod police.dovkod%type, 
                   p_tmdovkod tahsmaster.dovkod%type, p_tmhesapno tahsmaster.hesapno%type, p_valortar tahsmaster.valortar%type) RETURN NUMBER IS
  v_odenecekp   odeplan.dovtutar%type;
  v_odenecekg   odeplan.dovtutar%type;
  v_tahsilatp   tahsilat.dovtutar%type;
  v_tahsilatg   tahsilat.dovtutar%type;
  v_bakiye      number := 0;
  v_bakiyep     number := 0;
  v_bakiyeg     number := 0;
  v_sonuc       number := 0;
  v_kalan       number := 0;
  v_dovkur      number := 0;
  v_birim       number;
  v_decimal     number := 0;
  v_vadetar     date;
  v_thsmasraf   zeyl.thsmasraf%type;
  v_thsmasrafga zeyl.thsmasraf%type;
  v_kurcins     tarife.kurcins%type;
  v_asgekodetutar number := 0;
  v_getodedonem   number;
  v_ekkat       tarifetarprmdov.ekkat%type;
  v_ekyatirim   sysparam.ekyatirim%type;
BEGIN

	if nvl(p_periyot, 0) = 0 then
		raiseusererror('Periyot hanesi 0 olamaz.');--Eger 0 olursa bakiye bulumunda problem yasaniyor.
	end if;

	v_kalan  := p_tutar;
	begin
	  select ekyatirim
	    into v_ekyatirim
	    from sysparam;
	exception
		when others then
		messagebox('Sirketin ek yatirim yapip yapmadigini kontrol etmeyi saglayan parametre bulumunda hata olustu.');
		showerror;
		raise form_trigger_failure;
	end;

  if v_ekyatirim is not null and v_ekyatirim <> 'E' then--Eger ek yatirim parametresi sorulu ya da sorusuz ek yatirim yapilmayacaksa direkt rakami geri döndür.
  	return v_kalan;
  end if;

  --Tahsilat masrafi bulunumu.
  begin
    select nvl(z.thsmasrafga, 'Y') , nvl(z.thsmasraf, 'Y'), nvl(tr.kurcins, 'ES') kurcins
      into v_thsmasrafga, v_thsmasraf, v_kurcins
      from zeyl z, police p, tarife tr
     where p.polid  = p_polid
       and z.polid  = p.polid
       and z.zeylno = (select max(zeylno)
                           from zeyl
                          where polid = z.polid
                            and bastar <= greatest(p_tmodetar, bastar))
       and tr.branskod = p.branskod
       and tr.urunkod  = p.urunkod
       and tr.tarifeno = z.tarifeno;
  exception
  	when others then
  	messagebox('Tahsilat masrafi, kur cinsi bulumunda hata olustu.');
  	showerror;
  	raise form_trigger_failure;
  end;

  --*********************************************************************************************************************
  --Asgari ek ödeme tutari bulunumu
  begin
    select tp.ekkat
      into v_ekkat
      from police p, zeyl z, tarifetarprmdov tp
     where p.polid     = p_polid
       and z.polid     = p.polid
       and z.zeylno    = p.sonzeylno
       and tp.branskod = p.branskod
       and tp.tarifeno = z.tarifeno
       and tp.dovkod   = p.dovkod
       and tp.gecertar = (select max(gecertar)
                            from tarifetarprmdov
                           where branskod = p.branskod
                             and tarifeno = z.tarifeno
                             and dovkod   = p.dovkod);
  exception
    when no_data_found then
      raiseusererror(p_polid || ' numarali sözlesme için, tarihsel parametrelerde asgari ek ödeme tutari tanimlamasi yapilmamis.');
    when others then
      raiseusererror('Asgari ek ödeme tutari bulumunda problem olustu.');
  end;

  --*********************************************************************************************************************
	--Sysparamdaki ek yatirim parametresi ya da ek kat orani bossa ek yatirim sorusu sorulmayacak demektir.
	--messagebox('v_ekyatirim = ' || v_ekyatirim || ', v_ekkat = ' || v_ekkat);
	if v_ekyatirim is null or v_ekkat is null or p_borctip in ('E','D','H') then
		return v_kalan;
	end if;

  v_asgekodetutar := tahslib.aylikkp(p_polid, p_tmodetar) * v_ekkat;
    --EO--
  v_getodedonem   := GetOdeDonem(p_polid);

  --Bakiye Hesaplamalari.	
  select /*+
           index(o i_odp_polid_opid_vtar_btip)
         */
         nvl(sum(nvl(o.dovtutar, 0)), 0)
    into v_odenecekp
    from odeplan o
   where o.polid = p_polid
     and o.odepid = p_odepid
     --EO-- --and o.vadetar > akalib.addmonths(trunc(sysdate), nvl(-p_periyot, 0)) 
     --and o.vadetar <= trunc(sysdate)
     and o.vadetar between akalib.addmonths(trunc(sysdate), -v_getodedonem) and trunc(sysdate)
     and o.borctip = 'P';


  select /*+
           index(o i_odp_polid_opid_vtar_btip)
         */         
         nvl(sum(nvl(o.dovtutar, 0)), 0)
    into v_odenecekg
    from odeplan o
   where o.polid = p_polid
     and o.odepid = p_odepid
     and o.borctip = 'G'
     and o.vadetar <= trunc(sysdate);

  select nvl(sum(nvl(dovtutar, 0)+nvl(dovtutartolerans, 0)), 0)
    into v_tahsilatp
    from tahsilat
   where polid = p_polid
     and odepid = p_odepid
     and borctip = 'P'
     and vadetar between akalib.addmonths(trunc(sysdate), -v_getodedonem) and trunc(sysdate);
     --EO-- --and vadetar >  akalib.addmonths(trunc(sysdate), nvl(-p_periyot, 0)) 
     --and vadetar <= trunc(sysdate);


  select nvl(sum(nvl(dovtutar, 0)), 0)
    into v_tahsilatg
    from tahsilat
   where polid = p_polid
     and odepid = p_odepid
     and borctip = 'G';

  v_bakiyep := v_odenecekp - v_tahsilatp;
  v_bakiyeg := v_odenecekg - v_tahsilatg;

  v_bakiye := v_bakiyep + v_bakiyeg;
  --messagebox('v_bakiyep = ' || v_bakiyep || ', v_bakiyeg = ' || v_bakiyeg || ', v_bakiye = ' || v_bakiye);
  --*********************************************************************************************************************
  if p_tmdovkod <> dynamiclib.getDefVal('sigdef.YENITL') and p_poldovkod = dynamiclib.getDefVal('sigdef.YENITL') then--Bu durumda gelen paranin cinsi önemli.TRL poliçeye döviz girisi.
    v_dovkur  := akalib.KurOf(p_tmdovkod, v_kurcins, p_tmodetar, v_birim);
   	v_decimal := akalib.decimals(p_tmdovkod);
  else
	 	v_dovkur  := akalib.KurOf(p_poldovkod, v_kurcins, p_tmodetar, v_birim);
	 	v_decimal := akalib.decimals(p_poldovkod);
  end if;

  if v_bakiye <> 0 then--bakiye <> 0
    if p_tmdovkod = dynamiclib.getDefVal('sigdef.YENITL') and p_poldovkod = dynamiclib.getDefVal('sigdef.YENITL') or
    	 p_tmdovkod = dynamiclib.getDefVal('sigdef.YENITL') and p_poldovkod <> dynamiclib.getDefVal('sigdef.YENITL') then
    	 v_bakiyep   := round(v_bakiyep * v_dovkur, v_decimal);
    	 v_bakiyeg   := round(v_bakiyeg * v_dovkur, v_decimal);
    	 if v_thsmasraf = 'E' then    	 	 
         v_bakiyep := tahspkgbr.brutodenecek(p_polid, p_tmhesapno, v_bakiyep, null, p_tmodetar, 'P');
    	 end if;
    	 if v_thsmasrafga = 'E' then
         v_bakiyeg := tahspkgbr.brutodenecek(p_polid, p_tmhesapno, v_bakiyeg, null, p_tmodetar, 'G');         
    	 end if;
    	 v_bakiye := v_bakiyep + v_bakiyeg;       
       v_asgekodetutar := round(v_asgekodetutar * v_dovkur, v_decimal);
    elsif p_tmdovkod <> dynamiclib.getDefVal('sigdef.YENITL') and p_poldovkod = p_tmdovkod then  	 
       if v_thsmasraf = 'E' then
         v_bakiyep := tahspkgbr.brutodenecek(p_polid, p_tmhesapno, v_bakiyep, null, p_tmodetar, 'P');
       end if;
       if v_thsmasrafga = 'E' then
         v_bakiyeg := tahspkgbr.brutodenecek(p_polid, p_tmhesapno, v_bakiyeg, null, p_tmodetar, 'G');
       end if;
       v_bakiye := v_bakiyep + v_bakiyeg;
    elsif p_tmdovkod <> dynamiclib.getDefVal('sigdef.YENITL') and p_poldovkod = dynamiclib.getDefVal('sigdef.YENITL') then
    	 v_bakiyep  := round(v_bakiyep / v_dovkur, v_decimal);
    	 v_bakiyeg  := round(v_bakiyeg / v_dovkur, v_decimal);    	 
    	 if v_thsmasraf = 'E' then
         v_bakiyep := tahspkgbr.brutodenecek(p_polid, p_tmhesapno, v_bakiyep, null, p_tmodetar, 'P');
    	 end if;    	 
    	 if v_thsmasrafga = 'E' then
         v_bakiyeg := tahspkgbr.brutodenecek(p_polid, p_tmhesapno, v_bakiyeg, null, p_tmodetar, 'G');
    	 end if;
    	 v_bakiye := v_bakiyep + v_bakiyeg;
       v_asgekodetutar := round(v_asgekodetutar / v_dovkur, v_decimal);
    else
    	raiseusererror('Para çevriminde hata olustu. p_tmdovkod = ' || p_tmdovkod || ', p_poldovkod = ' || p_poldovkod);
    end if;
  end if;--bakiye <> 0

  --EO--
  v_vadetar := GetVadeTar(p_polid, p_odepid);

  --MessageBox('2=>v_bakiye = ' || v_bakiye || ', v_asgekodetutar = ' || v_asgekodetutar);
  if v_kalan > v_bakiye then -- Para bakiyeden ve asgari ek ödeme tutarindan büyük mü?
  	if v_ekyatirim = 'E' and v_kalan - v_bakiye > v_asgekodetutar and v_bakiye > 0 then --Eger sysparamdaki paramtre soru sorarak ek yatirim yaptiriyorsa.
  	  if confirmed('Su anda sözlesmenin bakiyesinden daha yüksek miktarda para girmis bulunmaktasiniz.'
  	  	           || 'Ilk önce ödemesi gerekeni, artan miktari da ek yatirim olarak tahsil etmek ister misiniz?') then       
  	  	 if v_bakiye > 0 then --Eger zaten -bakiyedeyse onu gönderme.
  	  	 	
  	  	   --MessageBox('3=>v_bakiye = ' || v_bakiye || ', p_borctip = ' || p_borctip || ' , p_periyot = ' || p_periyot);
  	  	   --MessageBox('3.1=>v_vadetar = ' || v_vadetar);
  	  	   --Ozan DZE 403
  	  	   --v_sonuc := tahspkgbr.tamdagit(p_polid, p_borctip, v_bakiye, p_seq, p_tmodetar, p_tmfistar, p_aciklama, v_vadetar, p_odepid, p_periyot, p_kartno, p_valortar);
		  	 		 v_sonuc := tahspkgbr.tamdagit(p_polid, p_borctip, v_bakiye, p_seq, :tahsparams.tmodetar, 
																					:tahsparams.tmfistar, p_aciklama, null, 
			                                    p_odepid, p_periyot, p_kartno, :tahsparams.tmvalortar);
		  	 else
		  	   v_bakiye := 0;
  	  	 end if;
         v_kalan := v_kalan - v_bakiye;
  	  	 --Ek yatirim
  	  	 --MessageBox('4=>v_kalan = ' || v_kalan || ', p_borctip = ' || 'E');
  	  	 v_sonuc := tahspkgbr.tamdagit(p_polid, 'E', v_kalan, p_seq, p_tmodetar, p_tmfistar, p_aciklama, p_vadetar, p_odepid, p_periyot, p_kartno, p_valortar);
  	  	 --****************************************************************************************************************
  	  	 return 0;
  	  	 --MessageBox('5');
  	  	 elsif confirmed('Ilk önce ödemesi gerekeni sonra, artan para ileriki vadelere aktarilacak. Emin misiniz?') then
  	  --	 	Messagebox(v_kalan);
  	  	 	
		  	 return v_kalan;

	    else
		  	 raiseusererror('Sözlesmeye tahsilat girisi, kullanici istegiyle iptal edildi.');  	
	    end if;
  	elsif v_ekyatirim = 'E' and v_kalan > v_asgekodetutar and v_bakiye <= 0 then
  	  if confirmed('Su anda sözlesmenin bakiyesi 0 ya da 0 dan küçük. Tutari ek yatirim olarak tahsil etmek ister misiniz?') then
  	  	 --Ek yatirim
  	  	 v_sonuc := tahspkgbr.tamdagit(p_polid, 'E', v_kalan, p_seq, p_tmodetar, p_tmfistar, p_aciklama, p_vadetar, p_odepid, p_periyot, p_kartno, p_valortar);
  	  	 --****************************************************************************************************************
  	  	 return 0;
		  elsif confirmed('Ilk önce ödemesi gerekeni sonra, artan para ileriki vadelere aktarilacak. Emin misiniz?') then
		  	 return v_kalan;
	    else
		  	 raiseusererror('Sözlesmeye tahsilat girisi, kullanici istegiyle iptal edildi.');  	
	    end if;  	  	
  	elsif v_ekyatirim is null then--Sysparam parametre
  	  --MessageBox('if v_ekyatirim is null');
  	  if v_bakiye >= 0 then --Eger zaten -bakiyedeyse onu gönderme.
  	    --MessageBox('if v_bakiye >= 0');
  	    v_sonuc := tahspkgbr.tamdagit(p_polid, p_borctip, v_bakiye, p_seq, p_tmodetar, p_tmfistar, p_aciklama, p_vadetar, p_odepid, p_periyot, p_kartno, p_valortar);
  	  else
		    v_bakiye := 0;
  	  end if;
      v_kalan := v_kalan - v_bakiye;
  	  --MessageBox('Ek yatirim');
  	  --Ek yatirim
  	  v_sonuc := tahspkgbr.tamdagit(p_polid, 'E', v_kalan, p_seq, p_tmodetar, p_tmfistar, p_aciklama, p_vadetar, p_odepid, p_periyot, p_kartno, p_valortar);
  	  --****************************************************************************************************************
  	  return 0;
  	end if;--Sysparam parametre kontrolü
  end if; --Para ödenecekten büyük mü?
  return v_kalan;
exception
	when others then
	showerror;
	raise form_trigger_failure;
END;