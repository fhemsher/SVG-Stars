//pl_hostname,pl_letter,pl_discmethod,pl_pnum,pl_orbper,pl_orbpererr1,pl_orbpererr2,pl_orbperlim,pl_orbpern,pl_orbsmax,pl_orbsmaxerr1,pl_orbsmaxerr2,pl_orbsmaxlim,pl_orbsmaxn,pl_orbeccen,pl_orbeccenerr1,pl_orbeccenerr2,pl_orbeccenlim,pl_orbeccenn,pl_orbincl,pl_orbinclerr1,pl_orbinclerr2,pl_orbincllim,pl_orbincln,pl_bmassj,pl_bmassjerr1,pl_bmassjerr2,pl_bmassjlim,pl_bmassn,pl_bmassprov,pl_radj,pl_radjerr1,pl_radjerr2,pl_radjlim,pl_radn,pl_dens,pl_denserr1,pl_denserr2,pl_denslim,pl_densn,pl_ttvflag,pl_kepflag,pl_k2flag,ra_str,dec_str,ra,st_raerr,dec,st_decerr,st_posn,st_dist,st_disterr1,st_disterr2,st_distlim,st_distn,st_optmag,st_optmagerr,st_optmaglim,st_optmagblend,st_optband,st_teff,st_tefferr1,st_tefferr2,st_tefflim,st_teffblend,st_teffn,st_mass,st_masserr1,st_masserr2,st_masslim,st_massblend,st_massn,st_rad,st_raderr1,st_raderr2,st_radlim,st_radblend,st_radn,pl_nnotes,rowupdate




var ExoJSONUpdate
function updateExoplanetButtonClicked()
{
           //  ra,dec,host star,planet Name,orbital diam(max)AU
 //var api="http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_letter,hd_name,hip_name,ra,dec,pl_orbsmax"
           //---everything---
 //var api="http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets"
   //var api="http://exoplanets.org/csv-files/exoplanets.csv"

  var api="../Exoplanet/exoplanetsDB.txt" //---temp---
   d3.csv(api,function(data)
   {   var cw=constellationCw
     ExoJSONUpdate=data
      var currentExosLength=ExoXmlDoc.childNodes.length
      var updateExosLength=ExoJSONUpdate.length

      //alert(currentExosLength+" "+updateExosLength)
     //if(currentExosLength==updateExosLength)
        cw.updatedExosDiv.innerHTML="No new Exoplanets"
   })






}