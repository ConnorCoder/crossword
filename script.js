let w, h, c;

window.onload = function() {
  let s = location.search.slice(1).split("$"), d = false;

  w = parseInt(s[0].split("x")[0])
  h = parseInt(s[0].split("x")[1]);

  if(w.toString() === "NaN" || h.toString() === "NaN") {
    let w = prompt("Enter width of crossword:","");
    let h = prompt("Enter height of crossword:","");
    history.pushState("","",`?${w}x${h}`);
    location.reload();
  }

  if(s.length > 1) {
    c = dash(false, s[1]);
    d = true;
  }

  createGrid(d);
}
window.onresize = function() {
  let wh = (innerWidth - (4 * w)) / w;
  if((innerHeight - (4 * h)) / h < wh) {
    wh = (innerHeight - (4 * h)) / h;
  }
  document.getElementById("s").innerHTML = `.sqr {width:${wh}px;height:${wh}px;font-size:${wh / 1.5}px}`;
}
function createGrid(d) {
  let sty = document.createElement("style");
  sty.id = "s";
  document.body.appendChild(sty);
  for(let i=0;i<h;i++) {
    for(let z=0;z<w;z++) {
      let a = document.createElement("input");
      a.className = "sqr";
      a.addEventListener("change", e => {
        reload();
      });

      document.body.appendChild(a);
    }
    document.body.appendChild(document.createElement("br"));
  }

  if(d) {
    let e = document.getElementsByTagName("input");
    for(let i=0;i<e.length;i++) {
      if(c[i] === "-") {
        e[i].className = "sqr nv";
      }else {
        e[i].value = c[i];
        if(e[i].value === "?") {
          e[i].className = "sqr q";
        }
      }
    }
  }

  onresize();
}
function reload() {
  let a = ("-".repeat(w * h)).split("");
  let e = document.getElementsByTagName("input");
  for(let i=0;i<e.length;i++) {
    if(e[i].value.length > 1) {
      e[i].value = e[i].value[0];
      a[i] = e[i].value;
    }
    if(!(new RegExp("[a-z?]","i").test(e[i].value))) {
      e[i].value = "";
      a[i] = "-";
      e[i].className = "sqr nv";
    }else {
      a[i] = e[i].value[0];
      if(e[i].value === "?") {
        e[i].className = "sqr q";
      }else {
        e[i].className = "sqr";
      }
    }
  }
  history.pushState("","",`?${w}x${h}$${dash(true, a.join(""))}`);
}
function dash(shrink, c) {
  if(shrink) {
    c = c + "-$";
    let a = "";
    let o = "";
    for(let i=0;i<c.length;i++) {
      let v = c[i];
      if(v === "-") {
        a += "-";
      }else {
        if(a.length > 2) {
          o += `${a.length}+${v}`;
          a = "";
        }else {
          o += a + v;
          a = "";
        }
      }
    }
    return o.slice(0, -1);
  }else {
    let a= "";
    let o = "";
    for(let i=0;i<c.length;i++) {
      if("0123456789".indexOf(c[i]) !== -1) {
        a += c[i];
      }else if(c[i] === "+") {
        o += "-".repeat(parseInt(a));
        a = "";
      }else {
        o += c[i];
      }
    }
    return o;
  }
}
