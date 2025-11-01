// 页面加载时禁用平滑滚动，防止自动滑动效果
document.documentElement.style.scrollBehavior = 'auto';
document.body.style.scrollBehavior = 'auto';

window.addEventListener('DOMContentLoaded', function () {
  // 确保页面加载时滚动到顶部，不产生滑动效果
  window.scrollTo(0, 0);
  
  if (sessionStorage.getItem('started') === 'true') {
    const originalPhoto = document.getElementById('original-photo');
    if (originalPhoto) originalPhoto.style.display = 'none';

    const bg = document.getElementById('background-image');
    const section = document.querySelector('.photo-section');
    const buttons = document.querySelector(".button-group");

    if (section.offsetHeight > window.innerHeight) {
      bg.classList.add('limit-to-section');
    } else {
      bg.classList.remove('limit-to-section');
    }

    bg.classList.add('visible');
    buttons.classList.add("visible");

    const overlay = document.querySelector('.overlay-content');
    if (overlay) overlay.style.display = 'none';
  }
  
  // 页面完全加载后，延迟恢复平滑滚动
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
  }, 1000);
  //音乐播放
      const audio = document.getElementById("bgm");

    // 先解除静音
    audio.muted = false;

    // 尝试播放
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("BGM 正常自动播放");
        })
        .catch(error => {
          console.warn("自动播放失败，可能需要用户交互触发播放：", error);
        });
    }

  

});

const welcomeImg = document.querySelector('.welcome-img');
const introSection = document.querySelector('.intro');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      welcomeImg.classList.add('visible');
    } else {
      welcomeImg.classList.remove('visible');
    }
  });
}, {
  threshold: 0.2
});

observer.observe(introSection);

let isScrolling = false;

window.addEventListener('wheel', function (e) {
  if (isScrolling) return; // 正在滚动中，忽略多次触发
  isScrolling = true;

  const intro = document.querySelector('.intro');
  const photo = document.querySelector('.photo-section');
  const currentScroll = window.scrollY;
  const viewportHeight = window.innerHeight;

  if (e.deltaY > 0) {
    // 用户向下滑
    if (currentScroll < viewportHeight / 2) {
      // 当前在 intro 区域
      photo.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // 用户向上滑
    if (currentScroll >= viewportHeight / 2) {
      // 当前在 photo 区域
      intro.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // 在 1 秒后允许再次滚动
  setTimeout(() => {
    isScrolling = false;
  }, 1000);
});

particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 600, // 粒子数量
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ff3b00" // 火焰的颜色
    },
    "shape": {
      "type": "circle", // 粒子形状
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5, // 初始不透明度
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0
      }
    },
    "size": {
      "value": 5, // 粒子大小
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0.1
      }
    },
    "line_linked": {
      "enable": false // 不显示粒子之间的连线
    },
    "move": {
      "enable": true,
      "speed": 1, // 粒子移动速度
      "direction": "top", // 向上移动
      "random": true,
      "straight": false,
      "out_mode": "out", // 粒子超出容器时消失
      "attract": {
        "enable": false
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": false
      },
      "onclick": {
        "enable": false
      }
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 0.8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

document.querySelector('.start-btn').addEventListener('click', function () {
  // 隐藏原图
  const originalPhoto = document.getElementById('original-photo');
  originalPhoto.style.display = 'none';

  const bg = document.getElementById('background-image');
  const section = document.querySelector('.photo-section');
  const buttons = document.querySelector(".button-group");

  // 判断 section 是否比 viewport 高
  if (section.offsetHeight > window.innerHeight) {
    bg.classList.add('limit-to-section');
  } else {
    bg.classList.remove('limit-to-section');
  }

  // 显示背景图
  bg.classList.add('visible');
  buttons.classList.add("visible");

  // 隐藏文字和按钮
  document.querySelector('.overlay-content').style.display = 'none';

  sessionStorage.setItem('started', 'true');
});