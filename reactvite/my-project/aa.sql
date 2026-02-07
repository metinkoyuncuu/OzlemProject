declare
	v_sonuc     number := 0;
	v_tutar     number := 0;
	v_kusurat   number := 0;
	v_index     number;
	v_sodindex  number;
	v_zeyltip   zeyl.zeyltip%type;
	v_intiktar  date;
	v_sayac     number;
	v_odenen    number;
	v_zeylno    number;
	v_dagit			number;
	v_dagitilacaktutar number;
	v_cntilkprim number;
	
	v_status    police.status%type;
	v_substatus police.status%type;
	
	rs					sigortali%rowtype;
	rp					policeview%rowtype;
	rt 					sontarife%rowtype;

	cursor c_pol(c_polid police.polid%type) is
		select p.polid, p.dovkod, p.poltantar, z.branskod, decode(z.branskod, 'E', 12, 0) periyot, z.grupid, z.sigetid
		  from police p, zeyl z
		 where p.polid  = c_polid
		   and z.polid  = p.polid
		   and z.zeylno = p.sonzeylno;

	polrec    			c_pol%rowtype;	
	v_durum   			number := 0;
	v_tutard        number;
	v_tutarh        number;
	v_devirtipid    number;
	v_devirtipih    number;
	v_devir   			number;
	v_islendi 			varchar2(1);
	v_datetar 			date;
	v_tmtutar       number;
	v_odepid  			tahsilat.odepid%type;
	v_planno  			varchar2(10);
	v_count         number;
	v_devirtahsno   tahsilat.tahsno%type;	
  v_isSrtOnay     number := 0;
  v_tarDegKontrol number := 0; /* <AEGL-10477> */
	proc      			constant varchar2(30) := 'BTN_VADEDAGIT';
begin
	
	-- <AEGL-11446>
  if (:polara2.branskod <> 'E') and (nvl(to_number(GetSysprmVal('YTM_SERVICE_TRANSACTION_MODE')),0) = 1) then
    messagebox('YTM kapsamında sadece Emeklilik sözleşmeleri için bu ekrandan tahsilat girişi yapılabilir.');
		return;
  end if; 
  -- </AEGL-11446>
	
		--AEGL-4929
	
	select count(1)
	  into v_isSrtOnay
	  from sartlionay
	 where polid = :polara2.polid
	   and kumetip = 'M'
	   and aktif = 'T';


	if :polara2.urunkod = 'OKS' and :polara2.polid <> :polara2.grupid and :tahsparams.BORCTIP <> 'B' then
	   messagebox('OKS kapsamında sadece bireysel ödemeye geçmiş veya OKS aktarım gelmiş sözleşmeler için bu ekrandan tahsilat girişi yapılabilir.');
	  return;
	 	--RaiseUserError('OKS kapsamında sadece bireysel ödemeye geçmiş veya OKS aktarım gelmiş sözleşmeler için bu ekrandan tahsilat girişi yapılabilir.');
	end if;
	
	
  if :polara2.provstatus is not null and v_isSrtOnay = 0 then
  	Showmessage(proc,true,'AKA-00899');
  end if;
  
  --AEGL-8747
  if :polara2.branskod = 'H' and :tahsparams.borctip not in ('A','P','M','I','D','F','T','Z','R','L','K') then
  	raiseusererror('Hayat poliçelerinde bu tahsilat tipinde vade dağıtılamaz.');
  end if;
  
	branskontrol;
	
	polidcnt;

  ekOdemeKontrol;--AEGL-5386
  
	v_durum := 1;
	ihbarkontrol(:polara2.polid);

  odetipkkarthavalekontrol;

	select tarifeno, zeylno into v_planno, v_zeylno from sonpol where polid = :polara2.polid;
	
  select count(*)
     into v_count
    from tarifetarprmkes
   where tarifeno = v_planno
     and tablotip = 'O';
                
  if v_count = 0 and :tahsparams.borctip = 'O' then
     raiseusererror('Baslangiç kapitali tanimli olmayan bir plana baslangiç kapitali girilemez.');
  end if;
	
  begin
    select islendi into v_islendi 
      from yathareket 
     where polid = -1 and tahsmasref = to_number(:parameter.p_seq);
  exception when others then
  	 v_islendi := null;
  end; 
  
  if v_islendi = 'T' then
    ShowMessage(proc,True,'AKA-00187','Ilgili Tahsmaster kaydi için fon islemi gerçeklesmis. Vade dagit yapilamaz. Torbadan emir islemi yapilmali. TAHSMASSEQ : ' || to_number(:parameter.p_seq));	
  end if;
  if :polara2.branskod = 'E' and :tahsparams.gtutar < 0 then
  	ShowMessage(proc,True,'AKA-00187','Emeklilik sözleşmeleri için eksi tahsilat dağıtılamaz');	
  end if;

  ------------ Devir tipinde bir sozlesmeyse 'D' tipinde tahsilat girilmeden Torbadab Emir verilmemeli.
  ------------ Ömer Yontar 14.08.2007 [start]
  select nvl(devirhesapsirketno,26)
    into v_devir
    from police
   where polid = :polara2.polid;

  if v_devir <> 26 and :tahsparams.borctip <> 'D' then
    --ofaruk: medet ile birlikte aegl-2458 nolu talebe istinaden kontrol değiştirildi.
    select sum(decode(borctip, 'D', dovtutar, 0)), sum(decode(borctip, 'H', dovtutar, 0))
	    into v_tutard, v_tutarh
      from tahsilat
	   where polid = :polara2.polid
	     and borctip in ('H', 'D');

    select sum(decode(devirtipi, 'X', 1, 0)), sum(decode(devirtipi, 'B', 1, 0))
	    into v_devirtipid, v_devirtipih
	    from sozlesmegecmis
	   where polid = :polara2.polid
	     and devirtipi in ('X', 'B');
   if :tahsparams.borctip !='V' then --AEGL-4571
    if nvl(v_devirtipid, 0) > 0 and nvl(v_tutard, 0) = 0 then
      ShowMessage(proc,True,'AKA-00187', 'Kayıt Numaralı sözleşme için Devir birikimi girilmeden (F Borctipi) Fazla Tahsilat ve E (Ek Yatirim) Tahsilatı giremezsiniz tahsilat işlemi durdurulmuştur. Tahsilat işlemi yapılamaz.' || :polara2.polid);
    elsif nvl(v_devirtipih, 0) > 0 and nvl(v_tutarh, 0) = 0 then
      ShowMessage(proc, True, 'AKA-00187', 'Kayıt Numaralı sözleşme için Hesap Birleştirme Tahsilatı girilmeden (F Borctipi) Fazla Tahsilat ve E (Ek Yatirim) Tahsilati giremezsiniz tahsilat işlemi durdurulmuştur. Tahsilat işlemi yapılamaz.' || :polara2.polid);
    end if;
   end if;  
  end if;

	open c_pol(:polara2.polid);
	  fetch c_pol into polrec;
	  if c_pol%notfound then
	  	ShowMessage(proc,True,'AKA-00187','Sözlesme bilgileri aliminda problem olustu. polid = ' || :polara2.polid);
	  end if;
	close c_pol;

	begin
		select vadetar
		  into v_datetar
		  from odeplan
		 where polid   = :polara2.polid
		   and borctip = 'P'
		   and ilkprim is not null;
	exception
		when others then
			v_datetar := null;
	end;

	if to_char(v_datetar, 'DDMM') = to_char(trunc(sysdate), 'DDMM') and polrec.branskod = 'E' then
		polrec.periyot := 11;
	end if;
	
	select tutar into v_tmtutar
	 from tahsmaster 
	where seq=:parameter.p_seq;
	
	if (v_tmtutar>0 and :tahsparams.gtutar<0) or (v_tmtutar<0 and :tahsparams.gtutar>0) then 
		raiseusererror('Master kaydi iade ise eksi,degilse arti tutar girmelisiniz.');
	end if;
  v_tutar := nvl(:tahsparams.gtutar, :tahsparams.tmfark); 
--Eger gelen para miktari 0'dan büyükse
	if (:tahsparams.tmfark >= 0) and (:tahsparams.gtutar is not null) and (:tahsparams.gtutar > :tahsparams.tmfark) then
			ShowMessage(proc,True,'AKA-00187','Kalan tutardan daha büyük tutar girisi yapildigi için islem yapilamaz.');
	end if;
--*************************************

--Eger gelen para miktari 0'dan küçükse
	if (:tahsparams.tmfark < 0) and (:tahsparams.gtutar is not null) and (:tahsparams.gtutar < :tahsparams.tmfark) then
			ShowMessage(proc,True,'AKA-00187','Iadede, kalan tutardan daha küçük tutar girisi yapildigi için islem yapilamaz.');
	end if;	
--*************************************

	if :tahsparams.tmodetar is null then
		 ShowMessage(proc,True,'AKA-00187','Lütfen ödeme tarihini belirtiniz.');
	end if;

  if polrec.polid <> polrec.grupid and polrec.poltantar is null then
    if not confirmed('Tanzim edilmemis bir grup altindaki katilimci sözlesmesine giris yapiyorsunuz. Devam etmek istediginize emin misiniz?') then
    	ShowMessage(proc,True,DEF_MESSAGE_HANDLER);
    end if;
  end if;
  
 if :polara2.urunkod = 'OKS' then --OKS
  	
  	v_odepid := polrec.sigetid;
  
  else
  if :sozodedurum.odepid is null and :polara2.branskod <> 'E' then  	
    v_odepid := polrec.sigetid;
  elsif :sozodedurum.odepid is null and :polara2.branskod = 'E' then
  	ShowMessage(proc,True,'AKA-00187','Lütfen ödeyeni belirtiniz.');
  else
  	v_odepid := :sozodedurum.odepid;
  end if;
 end if ;

	if ((:tahsparams.tmfark <> 0) or (:tahsparams.tmtutar is not null))  then		  
    --if :tahsparams.borctip = 'D' then
     if :tahsparams.borctip in ('D','V') then --AEGL-4571
			select count(*) into v_sayac from tahsilat where polid = :polara2.polid and borctip in ('D','V');
			if v_sayac > 0 then
				ShowMessage(proc,True,'AKA-00187',:polara2.polid||' Kayit Numarali sözlesme için daha önce Devir birikimi girilmis.');
			else
				select odenen
				  into v_odenen
				  from sozlesmegecmis
				 where polid = :polara2.polid
				   and soztar =
				       (select min(soztar)
				          from sozlesmegecmis
				         where polid =
				               :polara2.polid);
					if v_odenen > :tahsparams.tmfark then
						ShowMessage(proc,True,'AKA-00187',:polara2.polid||' Kayit Numarali sözlesme için Devir birikim tutarindan ('||v_odenen||') küçük tahsilat girilemez..');			
					end if;
					
					if :tahsparams.gtutar is not null then
						if v_odenen > :tahsparams.gtutar then
							ShowMessage(proc,True,'AKA-00187',:polara2.polid||' Kayit Numarali sözlesme için Devir birikim tutarindan ('||v_odenen||') küçük tahsilat girilemez..');			
						end if;
						if :tahsparams.gtutar > v_odenen then
							ShowMessage(proc,True,'AKA-00187',:polara2.polid||' Kayit Numarali sözlesme için Devir birikim tutarindan ('||v_odenen||') büyük tahsilat girilemez..');
						end if;
					end if;
		  	end if;
			  
			  v_sonuc := tahspkgbr.tamdagit(:POLARA2.polid, :tahsparams.borctip, nvl(:tahsparams.gtutar,v_odenen),
							                            to_number(:parameter.p_seq), :tahsparams.tmodetar, 
							                            :tahsparams.tmfistar, :tahsparams.aciklama, null, 
							                            v_odepid, polrec.periyot, null, :tahsparams.tmvalortar);
			else

      --Eger sözlesme(emeklilik tanzim olduysa, ancak ek yatirim yapilabilir.
      if polrec.poltantar is not null and polrec.branskod = 'E' and :tahsparams.borctip != 'O'  then

        v_tutar := ekyatirim(:POLARA2.polid, :tahsparams.borctip, v_tutar, to_number(:parameter.p_seq), :tahsparams.tmodetar, :tahsparams.tmfistar, 
                             :tahsparams.aciklama, null, v_odepid, polrec.periyot, null, :polara2.dovkod, :tahsparams.tmdovkod, :tahsparams.tmhesapno, 
                             :tahsparams.tmvalortar);
      end if;
      
	    if v_tutar <> 0 then --> Ek yatirim olayindan sonra tutar kalirsa.
	    	
	    	if IsSabitKur(v_planno) and :tahsparams.borctip <> 'L' /*AEGL-8413 Kambiyo vergisi dahil olmamalı*/ then
    		  
    		  --ilk prim ise toplu tahsilat dağıtmaya konu olmamalı
    		  begin
	    			select count(1)
	    			  into v_cntilkprim
	    			  from odeplan_v
	    			 where polid = :polara2.polid
	    			   and vadetar = odeplanlib.findilkacikvade(:polara2.polid, v_zeylno, null)
	    			   and nvl(ilkprim, 'Z') = 'X';

         	     select count(*) into v_tarDegKontrol from zeyl where polid = :polara2.polid and zeyltip = '131'; /* <AEGL-10477> */

	    			   	if v_tarDegKontrol > 0 then /* <AEGL-10477> */
	    			   		for r in (select * from zeyl2 where polid = :polara2.polid and zeyltip = '131') loop
	    			   			if r.tarifeno like '%FR%' and odeplanlib.findilkacikvade(:polara2.polid, v_zeylno, null) = r.bastar then
	    			   				v_cntilkprim := 1;
	    			   				exit;
	    			   			end if;
	    			   		end loop;
	    			   	end if;

    		  exception
    		  	when others then
    		  	  v_cntilkprim := 0;
    		  end;
    		  
    			begin
				    select round(ek2 / odedonem, 2)
				   	  into v_dagit
             from sigortali s 
	                ,zeyl      z
	           where z.polid = s.polid
	             and z.zeylno = s.zeylno
	             and z.zeylno = (select max(z1.zeylno) 
	             									 from zeyl z1 
	             									where z1.polid = s.polid 
	             									  and bastar <= odeplanlib.findilkacikvade(z1.polid, z1.zeylno, null) 
	             									  and exists (select 1 from zeyltips zt where zt.zeyltip = z1.zeyltip and zt.primdeg = 'T'))
	             and s.polid = :polara2.polid;
    			exception
    				when others then
    				  ShowMessage(proc, true, 'AKA-00187', 'Ek2 tutari hatali');
    			end;
    		  
	    		--aegl-6625 rolusd ürünlerinde toplu tahsilat giriş için eklendi
	    		--ilk prim ise toplu tahsilat dağıtmaya konu olmamalı
	    		--tahsmaster ın tutarı ek2/odedonemden fazla olmalı
	    		if Issabitkur(v_planno) and v_cntilkprim = 0 and nvl(:tahsparams.gtutar,:tahsparams.tmfark) > v_dagit and :tahsparams.borctip <> 'Z' /*aegl-11404*/ then
	    			
	    			v_dagitilacaktutar := nvl(:tahsparams.gtutar,:tahsparams.tmfark);
	    			
	    			--tutar vadenin karsiligi kadar dagitilmali
	    			while v_dagitilacaktutar > 0 loop
	    				
	    			  begin
						    select round(ek2 / odedonem, 2)
						    	into v_dagit
		              from sigortali s 
		                   ,zeyl      z
			           where z.polid = s.polid
			             and z.zeylno = s.zeylno
			             and z.zeylno = (select max(z1.zeylno) 
			             									 from zeyl z1 
			             									where z1.polid = s.polid 
			             									  and bastar <= odeplanlib.findilkacikvade(z1.polid, z1.zeylno, null) 
			             									  and exists (select 1 from zeyltips zt where zt.zeyltip = z1.zeyltip and zt.primdeg = 'T'))
			             and s.polid = :polara2.polid;
	    			  exception
		    				when others then
		    				  ShowMessage(proc, true, 'AKA-00187', 'Ek2 tutari hatali');
		    			end;
	    				
	    				if v_dagitilacaktutar >= v_dagit then
	    					
		    				v_sonuc := tahspkgbr.tamdagit(:POLARA2.polid, :tahsparams.borctip, v_dagit,
									                            to_number(:parameter.p_seq), :tahsparams.tmodetar, 
									                            :tahsparams.tmfistar, :tahsparams.aciklama, null, 
									                            v_odepid, polrec.periyot, null, :tahsparams.tmvalortar, 1, null, v_dagit);
	    				else
	    					
	    					v_sonuc := tahspkgbr.tamdagit(:POLARA2.polid, 'F', v_dagitilacaktutar,
									                            to_number(:parameter.p_seq), :tahsparams.tmodetar, 
									                            :tahsparams.tmfistar, :tahsparams.aciklama, null, 
									                            v_odepid, polrec.periyot, null, :tahsparams.tmvalortar, 1, null, v_dagitilacaktutar);
	    				end if;
	    				
	            v_dagitilacaktutar :=  v_dagitilacaktutar - v_dagit;
					  end loop;
			else				                            
				v_sonuc := tahspkgbr.tamdagit(:POLARA2.polid, :tahsparams.borctip, nvl(:tahsparams.gtutar,:tahsparams.tmfark),
						                            to_number(:parameter.p_seq), :tahsparams.tmodetar, 
						                            :tahsparams.tmfistar, :tahsparams.aciklama, null, 
						                            v_odepid, polrec.periyot, null, :tahsparams.tmvalortar, 1, null, nvl(:tahsparams.gtutar,:tahsparams.tmfark));
          end if;
	    	else
				  v_sonuc := tahspkgbr.tamdagit(:POLARA2.polid, :tahsparams.borctip, v_tutar, 
				                                to_number(:parameter.p_seq), :tahsparams.tmodetar, 
				                                :tahsparams.tmfistar, :tahsparams.aciklama, null, 
				                                v_odepid, polrec.periyot, null, :tahsparams.tmvalortar);		
	      end if;
	    end if;
	    v_durum := 2;
		end if;--ozan
	end if;
	
  if :polara2.branskod = 'H' 
  and :tahsparams.borctip !='Z' --AEGL-5040
  then
    bakiyekontrol(:polara2.polid, :sozodedurum.odepid, :parameter.p_seq);
  end if;

	:tahsparams.tmfark := tahspkgbr.farkhesabi(:parameter.p_seq);
	--devir update ozan bu kontroller pakette olmalıydı
	begin
	  
	  --if :tahsparams.borctip = 'D' then --AEGL-4571
	  	if :tahsparams.borctip in ( 'D','V') then
	    
	    select min(tahsno)
	      into v_devirtahsno
	      from tahsilat
	     where polid = :polara2.polid
	       and borctip = :tahsparams.borctip;
	       
	    update sozlesmegecmis
	       set devirtahsno = v_devirtahsno
	     where seq = (select seq
	                    from sozlesmegecmis
	                   where polid = :polara2.polid
	                     and soztar = (select min(soztar)
	                                     from sozlesmegecmis
	                                    where polid = :polara2.polid));
	  end if;
	exception
		when others then
		 ShowMessage(proc,True,'AKA-00187','Devir tahsilatı için sözleşme geçmiş güncellenirken hata oluştu'||sqlerrm);
	end;
	
	commit_form;

	poldurum(:polara2.polid);
	:tahsparams.gtutar     := null;
	:tahsparams.borctip    := 'K';
--*******************************************************  

--Ödeme Durumunun Güncellenmesi
  go_block('sozodedurum');
	v_sodindex := get_block_property('sozodedurum', current_record);
	execute_query;
	go_record(v_sodindex);
	go_block('tahsilat');
--*******************************************************  

  v_index := get_block_property('tahsilat', current_record);
	go_block('tahsilat');
	execute_query;
	go_record(v_index);

exception 
	when others then
  	if v_durum = 2 then
  	  rollback;
  	end if;
	  ShowMessage(proc,True,DEF_MESSAGE_HANDLER);
end;