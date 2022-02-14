async function work() {
    var captilize = false

    var accents = ["€","’","“","”","«","»","–","—","á","é","í","ñ","ó","ú","ü","¿","¡",]
    var accentscaptilize = ["€", "’", "“", "”", "«", "»", "–", "—", "Á", "É", "Í", "Ñ", "Ó", "Ú", "Ü", "¿", "¡"]
    for (v of accents) {
        index = accents.indexOf(v)
        captilizething = accentscaptilize[accents.indexOf(v)]

        var btn = document.createElement("button")

        btn.setAttribute("captilize", captilizething.toString())
        btn.setAttribute("normal", v)
        btn.setAttribute("index", index.toString())

        btn.innerText = v.toString()


        btn.addEventListener("click", function (e) {
            copytext(e.target.getAttribute("index").toString())
        })

        document.body.append(btn)
    }
    captilizething = null

    document.addEventListener("keydown", function (e) {
        if (e.key == "Shift") {
            for (v of document.body.getElementsByTagName("button")) {
                v.innerHTML = v.getAttribute("captilize")
                captilize = true
            }
        }
    })

    document.addEventListener("keyup", function (e) {
        if (e.key == "Shift") {
            for (v of document.body.getElementsByTagName("button")) {
                v.innerHTML = v.getAttribute("normal")
                captilize = false
            }
        }
    })


    function copytext(index) {
        var bg = chrome.extension.getBackgroundPage();
        var bgBox = bg.document.getElementById('textbox');

        if (captilize) {
            bgBox.value = accentscaptilize[index]
        } else {
            bgBox.value = accents[index]
        }

        bgBox.focus();
        bgBox.select();
        bg.document.execCommand('copy');
        window.close();
    }

}

async function getversion() {
    var currentversionfetch = await fetch("https://raw.githubusercontent.com/Reallukeisbest/french-accents/main/src/manifest.json");
    var versionfetch = await fetch("manifest.json");

    if (currentversionfetch.ok == true && versionfetch.ok == true) {
        var currentversion = await currentversionfetch.json()
        var version = await versionfetch.json()


        if (version.version != currentversion.version) {
            document.body.innerHTML = "<h1>Please update</h1><h2>There is a new verison avalible</h2><button id='update' style='width: fit-content; height: fit-content; padding: 15px 30px;'>Download the new version</button>"
            document.getElementById("update").addEventListener("click", function() {
                window.open("https://github.com/Reallukeisbest/french-accents/releases/tag/Release")
            })
        }

    }
}


work()
getversion()