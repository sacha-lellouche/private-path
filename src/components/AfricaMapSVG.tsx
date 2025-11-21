const AfricaMapSVG = () => {
  return (
    <svg 
      viewBox="0 0 1000 1100" 
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="africaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(160, 45%, 85%)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(156, 35%, 75%)', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="africaShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Simplified Africa continent shape */}
      <path
        d="M 500 50 
           L 520 60 L 540 70 L 560 85 L 580 100 L 600 120 L 615 145 L 625 170 L 632 200 L 635 230 L 635 260 L 630 290 
           L 625 320 L 620 350 L 618 380 L 620 410 L 625 440 L 632 470 L 640 500 L 650 530 L 665 560 L 680 590 L 695 620 
           L 708 650 L 718 680 L 725 710 L 730 740 L 732 770 L 730 800 L 725 830 L 715 860 L 700 885 L 680 905 L 655 920 
           L 625 930 L 595 935 L 565 935 L 535 930 L 505 920 L 480 905 L 460 885 L 445 860 L 435 830 L 430 800 L 428 770 
           L 430 740 L 435 710 L 442 680 L 452 650 L 465 620 L 480 590 L 495 560 L 510 530 L 520 500 L 525 470 L 528 440 
           L 525 410 L 520 380 L 515 350 L 510 320 L 505 290 L 500 260 L 498 230 L 498 200 L 500 170 L 505 145 L 512 120 
           L 520 100 L 530 85 L 540 70 L 500 50 
           
           M 520 100 L 480 120 L 450 145 L 425 175 L 405 210 L 390 250 L 380 290 L 375 330 L 372 370 L 372 410 L 375 450 
           L 380 490 L 388 530 L 398 570 L 410 610 L 425 645 L 442 675 L 460 700 L 480 720 L 505 735 L 530 745 L 555 750 
           L 580 750 L 605 745 L 630 735 L 650 720 L 665 700 L 675 675 L 682 645 L 685 610 L 682 570 L 675 530 L 665 490 
           L 652 450 L 638 410 L 625 370 L 615 330 L 608 290 L 605 250 L 608 210 L 615 175 L 625 145 L 638 120 L 580 100 
           Z
           
           M 350 250 L 320 270 L 295 295 L 275 325 L 260 360 L 250 400 L 245 440 L 245 480 L 250 520 L 260 560 L 275 600 
           L 295 635 L 320 665 L 350 690 L 385 710 L 420 720 L 350 680 L 320 650 L 295 615 L 275 575 L 260 530 L 250 485 
           L 248 440 L 252 395 L 262 350 L 278 310 L 300 275 Z"
        fill="url(#africaGradient)"
        stroke="hsl(156, 55%, 17%)"
        strokeWidth="2"
        filter="url(#africaShadow)"
        opacity="0.9"
      />
      
      {/* Sahara region (lighter) */}
      <ellipse
        cx="500"
        cy="200"
        rx="120"
        ry="80"
        fill="hsl(41, 25%, 88%)"
        opacity="0.4"
      />
      
      {/* Sub-Saharan vegetation (darker green) */}
      <ellipse
        cx="480"
        cy="450"
        rx="140"
        ry="100"
        fill="hsl(156, 45%, 35%)"
        opacity="0.2"
      />
    </svg>
  );
};

export default AfricaMapSVG;
