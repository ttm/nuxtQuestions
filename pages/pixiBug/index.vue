<template>
  <div>
    <div>
      <h1>
        PIXI-NUXT-EXAMPLE
      </h1>
      <h2>
        scroll down to see the canvas
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  // uncomment the following lines for the example to work (to avoid the bug?)
  head () {
    return {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.0.2/pixi.js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.0.2/pixi.js.map' },
      ]
    }
  },
  mounted () {
    var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
    document.body.appendChild(app.view);
    
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage('https://pbs.twimg.com/profile_images/447374371917922304/P4BzupWu.jpeg');
    
    // Scale mode for pixelation
    texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    
    for (var i = 0; i < 10; i++) {
        createBunny(
            Math.floor(Math.random() * app.screen.width),
            Math.floor(Math.random() * app.screen.height)
        );
    }
    
    function createBunny(x, y) {
    
        // create our little bunny friend..
        var bunny = new PIXI.Sprite(texture);
    
        // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
        bunny.interactive = true;
    
        // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
        bunny.buttonMode = true;
    
        // center the bunny's anchor point
        bunny.anchor.set(0.5);
    
        // make it a bit bigger, so it's easier to grab
        bunny.scale.set(3);
    
        // setup events for mouse + touch using
        // the pointer events
        bunny
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
        bunny.x = x;
        bunny.y = y;
    
        // add it to the stage
        app.stage.addChild(bunny);
    }
    
    function onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }
    
    function onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }
    
    function onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }  
  }
}
</script>
