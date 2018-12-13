

var PreviewHost = false
function previewHostStar()
{
    var cw = beginCw
    PreviewHost = true
    CelestialPreviewLoaded = false
    celestialContainerDiv.removeAttribute("title")
    hostStar.setAttribute("stroke-width", 10*.02)
    hostStar.setAttribute("font-size", 10)

    hostStar.setAttribute("x", -.4*10)
    hostStar.setAttribute("y", .335*10)


    showHostStarConstellation() //---see constellation.js---

    cw.previewHostStarButton.disabled = true
    cw.previewHostStarButton.innerHTML = "Adjusting Universe..."
    cw.beginMyStarButton.disabled = false
    cw.cancelMyStarButton.disabled = false
    cw.hostStarSelect.disabled = true

}
function resetPreviewHostStar()
{
    celestialContainerDiv.style.width = "60%"
    celestialContainerDiv.style.height = "60%"
    celestialContainerDiv.style.left = "35%"
    celestialContainerDiv.style.top = "20%"
    CelestialScale = 170
    CelestialView.k = 170
    CelestialView.r =[0.0, 0.0, 0.0]

    CelestialProjection.scale(CelestialView.k)
    CelestialProjection.rotate(CelestialView.r)
    CelestialZoom.scale(170)

    StopCelestialZoom = false

    PreviewHost = false
    CelestialPreviewLoaded = false
    var cw = beginCw
    var stars = hostStarG.childNodes
    for(var k = stars.length-1; k>=0; k--)
        hostStarG.removeChild(stars.item(k))

        CelestialG.selectAll(".boundaryline")
        .style("display", "block")
        CentroidCelestial.style("display", "none")

        EarthPathCelestial.attr("d", null)
        PrimaryStarPath.style("display", "none")
        StopCelestialZoom = false

        celestialRedraw()
        hideHighlightCon()
        cw.hostStarSelect.selectedIndex = 0
        cw.showExoDataButton.disabled = true
        cw.beginMyStarButton.disabled = true
        cw.previewHostStarButton.disabled = true
        cw.previewHostStarButton.innerHTML = "Adjust Universe"
        cw.hostStarSelect.disabled = false

        cw.cancelMyStarButton.disabled = true

        cw.sentRegistrationSpan.innerHTML = "&nbsp;"
}