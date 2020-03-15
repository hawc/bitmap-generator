<template>
    <div>
        <h2>Text styles</h2>
        <div class="setting">
            <label for="text">Text:</label><!--
         --><input type="text" id="text" v-model="textContent" />
        </div>
        <div class="setting">
            <label for="font">Font:</label><!--
         --><select id="font" v-model="font">
                <option value="Futura">Futura</option>
                <option value="Garamond">Garamond</option>
                <option value="Verdana">Verdana</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Impact">Impact</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Wingdings">Wingdings</option>
            </select>
        </div>
        <div class="setting">
            <label for="color">Color:</label><!--
         --><input type="color" id="color" v-model="color" />
        </div>
        <div class="setting">
            <label for="blur">Blur:</label><!--
         --><input type="range" id="blur" v-model.number="blur" min="1" max="100" step=".1" />
        </div>
        <div class="setting">
            <label for="blurColor">Blur color:</label><!--
         --><input type="color" id="blurColor" v-model="blurColor" />
        </div>
        <div class="setting">
            <label for="fontsize">Size:</label><!--
         --><input type="range" id="fontsize" v-model.number="fontsize" min="1" max="20" step=".1" />
        </div>
        <div class="setting">
            <label for="yTranslate">Position:</label><!--
         --><input type="range" id="yTranslate" v-model.number="yTranslate" min="0" max="2" step=".01" />
        </div>
        <h2>Background styles</h2>
        <div class="setting">
            <span :class="background === 'usePattern' ? '' : 'disabled'">
                <label for="pattern">
                <input name="background" type="radio" id="usePattern" value="usePattern" v-model="background"/><span>Pattern:</span>
                </label><!--
             --><input type="range" id="pattern" v-model="pattern" min="1" max="5" step="1" :disabled="background !== 'usePattern'"/>
            </span>
        </div>
        <div class="setting" :class="background === 'useColor' ? '' : 'disabled'">
            <label for="backgroundColor">
                <input name="background" type="radio" id="useColor" value="useColor" v-model="background"/><span>Color:</span>
            </label><!--
         --><input type="color" id="backgroundColor" v-model="backgroundColor" :disabled="background !== 'useColor'"/>
        </div>
        <div class="setting" :class="background === 'useImage' ? '' : 'disabled'">
            <label for="image">
                <input name="background" type="radio" id="useImage" value="useImage" v-model="background"/><span>Image:</span>
            </label><!--
         --><input type="file" ref="image" id="image" name="image" v-model="image" :disabled="background !== 'useImage'"/>
        </div>
        <h2>Rendering styles</h2>
        <div class="setting">
            <label for="zoom">Pixelation:</label><!--
         --><input type="range" id="zoom" v-model.number="zoom" min="1" max="8" step="1" />
        </div>
        <div class="setting">
            <label for="treshold">Treshold:</label><!--
         --><input type="range" id="treshold" v-model.number="treshold" min="0" max="255" step="1" />
        </div>
        <div class="setting">
            <label for="algorithm">Algorithm:</label><!--
         --><select id="algorithm" v-model="algorithm">
                <option value="bayer">Bayer</option>
                <option value="floydsteinberg">Floyd-Steinberg</option>
                <option value="atkinsons">Atkinsons</option>
                <option value="none">- no dithering -</option>
            </select>
        </div>
        <div class="setting">
            <label for="dimensions">Dimensions:</label><!--
         --><select id="dimensions" v-model="dimensions">
                <option value="0">fullscreen</option>
                <option value="1">10x15 cm</option>
                <option value="2">DIN A4</option>
            </select>
        </div>
        <!--<div class="setting">
            <label for="gameBoyMode">GameBoyMode:</label>
            <input type="checkbox" id="gameBoyMode" v-model="gameBoyMode" />
        </div>-->
        <div class="setting buttons">
            <button type="button" @click="reset" class="light">Reset</button><!--
         --><button type="button" @click="print">Print</button><!--
         --><button type="button" @click="download">Download</button>
            <a hidden href="#" id="dl" download="image.png">Download</a>
        </div>
    </div>
</template>