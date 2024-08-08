(function() {
  "use strict";

  const eleTwiport = document.querySelector('#twiport');
  const svgLines = document.querySelectorAll("#irlLanding .irlLandingButtonPositionContainer svg");
  const mobileLandingButtons = document.querySelectorAll("#irlLandingMobile .irlLandingButtonAnimationContainer");


  const calcSvgLineBounds = (svgLine) => {
    var vwTwiport = eleTwiport.getBoundingClientRect();
    let offsetx = Number(svgLine.getAttribute("offsetx"));
    let offsety = Number(svgLine.getAttribute("offsety"));
    let vwParent = svgLine.parentElement.getBoundingClientRect();

    let top = 0, left = 0, width = 0, height = 0;
    if (vwParent.top < vwTwiport.top) {
      top = vwParent.top + vwParent.height / 2;
      height = (vwTwiport.top - top) + offsety;
    } else {
      top = vwTwiport.bottom + offsety;
      height = vwParent.top - top + vwParent.height / 2;
    }

    if (vwParent.left < vwTwiport.left) {
      left = vwParent.right;
      width = vwTwiport.left - left + offsetx;
    } else {
      left  = vwTwiport.left + offsetx;
      width = vwParent.left - left;
    }

    svgLine.style.left = left < 0 ? 0 : left;
    svgLine.style.top = top < 0 ? 0 : top;
    svgLine.style.width = width < 0 ? 0 : width;
    svgLine.style.height = height < 0 ? 0 : height;
    svgLine.setAttribute("width", (width < 0 ? 0 : width)+"px");
    svgLine.setAttribute("height", (height < 0 ? 0 : height)+"px");
  }

  const onResize = () => {
    var vwTwiport = eleTwiport.getBoundingClientRect();
    if (vwTwiport.width < 350) {
      setTimeout(onResize, 2000);
    }

    for (const svgLine of svgLines) {
      calcSvgLineBounds(svgLine);
    }
  }
  window.addEventListener('resize', onResize);
  setTimeout(onResize, 2000);


  setInterval(() => {
    for (const svgLine of svgLines) {
      // if (svgLine.style.display == "block") {
      //   continue;
      // }
      let vwButton = svgLine.parentElement.firstElementChild.getBoundingClientRect();
      if (vwButton.width < 10) {
        svgLine.parentElement.firstElementChild.children[0].style.display = "none";
        svgLine.parentElement.firstElementChild.children[1].style.display = "none";
      } else {
        svgLine.parentElement.firstElementChild.children[0].style.display = "block";
        svgLine.parentElement.firstElementChild.children[1].style.display = "block";
      }

      if (vwButton.width >= 300) {
        calcSvgLineBounds(svgLine);
        svgLine.style.display = "block";
      } else {
        svgLine.style.display = "none";
      }
    }
    for (const mobileButton of mobileLandingButtons) {
      let vwButton = mobileButton.getBoundingClientRect();
      if (vwButton.width < 10) {
        mobileButton.children[0].style.display = "none";
        mobileButton.children[1].style.display = "none";
      } else {
        mobileButton.children[0].style.display = "block";
        mobileButton.children[1].style.display = "block";
      }
    }
    
  }, 100);

  const modalButtons = document.getElementsByClassName('irlLandingButtonAnimationContainer');
  const setTwiportDialogContent = (event) => {
    const button = event.currentTarget;
    const title = button.getAttribute('data-title');
    const content = button.getAttribute('data-content');
    const link = button.getAttribute('data-link');

    document.getElementById('irlTwiportModalTitle').textContent = title;
    document.getElementById('irlTwiportModalContent').textContent = content;
    document.getElementById('irlTwiportModalLink').href = link;
    
    if(title === "LeadR")
    okButton.onclick = () => {
      // Set the ok button's click event to navigate to the new homepage
      const okButton = document.getElementById('okButton');
      window.location.href = link;
    };
  }

  for (const button of modalButtons) {
    button.addEventListener('click', setTwiportDialogContent);
  }


  // const buttons = document.querySelectorAll(".btn-outline-primary, .irlLandingButtonAnimationContainer");
  // for (const button of buttons) {
  //   button.addEventListener("click", () => {
  //     const alertBox = document.querySelector("#irlAlert");
  //     alertBox.style.display = "block";
  //   });
  // }

})();

