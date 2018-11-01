function hideAllButtons()
{
   if(Mobile==false)
   topNavDiv.style.display="none"
   else
   {
      topNavDiv.style.visibility="hidden"
      openVisitButton.style.visibility="visible"

   }



}

function navButtonViz()
{





            openAddImageButton.style.opacity=.3
            openAddIconButton.style.opacity=.3
            openAddSymbolButton.style.opacity=.3
            openAddPathButton.style.opacity=.3
            openAddCircleButton.style.opacity=.3
            openAddEllipseButton.style.opacity=.3
            openAddRectButton.style.opacity=.3
            openAddPolygonButton.style.opacity=.3
            openAddTextButton.style.opacity=.3


            openReferrerButton.style.opacity=.3
            openAddImageButton.disabled=true
            openAddIconButton.disabled=true
            openAddSymbolButton.disabled=true
            openAddPathButton.disabled=true
            openAddCircleButton.disabled=true
            openAddEllipseButton.disabled=true
            openAddRectButton.disabled=true
            openAddPolygonButton.disabled=true
            openAddTextButton.disabled=true


            openReferrerButton.disabled=true









      navTable.style.visibility="hidden"


  //==================================================
  if(FOLDER && constellationViz==false)
  {


    

      if(!Visitor&&(oEMAIL))
      {
            openAddImageButton.style.opacity=1
            openAddIconButton.style.opacity=1
            openAddSymbolButton.style.opacity=1
            openAddPathButton.style.opacity=1
            openAddCircleButton.style.opacity=1
            openAddEllipseButton.style.opacity=1
            openAddRectButton.style.opacity=1
            openAddPolygonButton.style.opacity=1
            openAddTextButton.style.opacity=1
            openAddImageButton.disabled=false
            openAddIconButton.disabled=false
            openAddSymbolButton.disabled=false
            openAddPathButton.disabled=false
            openAddCircleButton.disabled=false
            openAddEllipseButton.disabled=false
            openAddRectButton.disabled=false
            openAddPolygonButton.disabled=false
            openAddTextButton.disabled=false
           // if(!uEMAIL)
            //{


            openReferrerButton.style.opacity=1

           

            openReferrerButton.disabled=false




            //}


       }









          navTable.style.visibility="visible"

  }



   //---Chrome 48 depricated pathSegList---
  // openAddPathButton.style.opacity=.3
 //  openAddPathButton.disabled=true


}