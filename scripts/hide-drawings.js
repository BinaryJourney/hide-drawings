//Register the keybind on initialisation.
Hooks.once('init', async function () {
    let my_key = getKeyFromSettings();
    game.keybindings.register("hide-drawings", "hideDrawings", {
        name: "Toggle On/Off Drawings",
        hint: "Will toggle the hiding/showing of the canvas drawings",
        editable: [
            {
                key: "Key" + my_key,
            }
        ],
        onDown: () => hideCanvasDrawings(),
        onUp: () => {},
        restricted: false,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
});

//Register the setting menu. Would be good to implement the same input selection as pointer.
//As it is now, any key writen in the setting will be interpreted by foundry through a QWERTY layout.
Hooks.once('ready', async function () {
    game.settings.register("hide-drawings", "hideDrawingSettings", {
        name: "Register hide-drawings keybind",
        hint: "You can edit the keybind to toggle drawings here. Be careful to bind as if you use a QWERTY keyboard.",
        scope: "client",
        config: true,
        requiresReload: true,
        type: String,
        default: 'F',
        onChange: value => {

        }
    });
});

function getKeyFromSettings() {
    //Default Key
    let my_key = "F";

    //Ty to get Key from world database
    try {
        my_key = game.settings.get('hide-drawings','hideDrawingSettings');
    } catch (e) {
        console.log("hide-drawings | The setting couldn't be fetched. Setting default key " + my_key)
    }

    return my_key;
}

//Hide drawings function. The visible here isn't the same visibility toggle
//the GM has as a button on the drawing. If the player use this it won't mess with any
//drawing you are trying to hide
function hideCanvasDrawings() {
    game.canvas.drawings.objects.children.forEach((drawing) => {
        drawing.visible = !drawing.visible;
    })
    // ui.notifications.info("Drawings Hidden")
}