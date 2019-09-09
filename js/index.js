/* 
 * MIT License
 * 
 * Copyright (c) 2019 Cristian Gonzales
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * Author: Cristian Gonzales
 */

$(document).ready(function(){
  // Text to be dynamically "typed"
  var titles = ["Fitness enthusiast",
  "Finance hobbyist", "Tech blogger", "Social Media Personality", "Software Engineer"];
  // Our definition of a "second"
  var oneSecond = 1200;

  /**
   * Recursive function that calls itself until it is finished "typing"
   * @param {string} text The text to be typed, an element of `titles`
   *                      array
   * @param {number} charIndex The index of the `titles` element character
   *                            to be displayed
   * @param {function} callback The function callback (instantiated
   *                            when the text is done being "typed")
   * */
  function titleWorkerFunc(text, charIndex, callback) {
    // The case where the title hasn't finished being "typed"
    if (charIndex < (text.length)) {
      // Add the next character to the sequence
      $(".my-titles").html(
        text.substring(0, charIndex + 1) 
        + '<span aria-hidden="true"></span>'
      );

      // Wait for a while and call this function again for next character
      setTimeout(function() {
        titleWorkerFunc(text, charIndex + 1, callback)
      }, 120);
    }
    /**
     * The text has finished "typing", call the callback to instantiate
     * the next function (if there is an existing callback as specified
     * by the caller)
     * */
    else {
      setTimeout(function() {
        titleWorkerBackwards(text, charIndex, callback);
      }, oneSecond);
    }
  }

  /**
   * TODO: Docstrings...
   * */
  function titleWorkerBackwards(text, charIndex, callback) {
    // The case where the title hasn't finished being "typed"
    if (charIndex > 0) {
      // Add the next character to the 
      $(".my-titles").html(
        text.substring(0, charIndex - 1) 
        + '<span aria-hidden="true"></span>'
      );

      // Wait for a while and call this function again for next character
      setTimeout(function() {
        titleWorkerBackwards(text, charIndex - 1, callback)
      }, 50);
    }
    /**
     * The text has finished "typing", call the callback to instantiate
     * the next function (if there is an existing callback as specified
     * by the caller)
     * */
    else if (typeof callback == 'function') {
      setTimeout(callback, 700);
    }
  }


  /**
   * Instantiation the title animation
   * @param {number} titleIndex The index of the title we are currently on
   *                              (this may be out of bounds, in which case
   *                               we will instantiate the fading in of the
   *                               "For Recruiters" and "Media" banners)
   *
   * */
  function startTitleAnimation(titleIndex) {
    /**
     * The case where we still have a valid title in the queue, so we 
     * call the worker function, passing the callback containing the index
     * of the next function
     * */
    if (typeof titles[titleIndex] == 'string'){
      titleWorkerFunc(titles[titleIndex], 0, function(){
        startTitleAnimation(titleIndex + 1);
      });
    /**
     * The case where there are no more titles to display in the queue,
     * so we fade out the "splashpage" and fade into the main landing
     * div
     * */
    } else {
      $("#welcome-splashpage").fadeOut(oneSecond);
      setTimeout(function() {
        $("#main").fadeIn(oneSecond);
      }, oneSecond);
    }
  }

  // Start the animation
  startTitleAnimation(0);
});
