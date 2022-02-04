class Stage{
    static initialize(){
        const stageElement =  document.getElementById("stage");
        stageElement.style.width=Config.puyoImgWidth*Config.stageCols+'px';
        stageElement.style.height=Config.puyoImgHeight*Config.stageRows+'px';
        stageElement.style.backgroundColor=Config.stageBackgroundColor;
        this.stageElement = stageElement;
        const zenkeshiImage=document.getElementById("zenkeshi");
        zenkeshiImage.width=Config.puyoImgWidth*6;
        zenkeshiImage.style.position='absolute';
        zenkeshiImage.style.display='none';
        this.zenkeshiImage=zenkeshiImage;
        stageElement.appendChild(zenkeshiImage);
        const scoreElement=document.getElementById("score");
        scoreElement.style.backgroundColor=Config.scoreBackgroundColor;
        scoreElement.style.top=Config.puyoImgHeight*Config.stageRows+'px';
        scoreElement.style.width=Config.puyoImgWidth*Config.stageCols+'px';
        scoreElement.style.height=Config.fontHeight+"px";
        this.scoreElement=scoreElement;
        this.board=[
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
        ];
        let puyoCount=0;
        for(let y=0;y<Config.stageRows;y++){
            const line = this.board[y]||(this.board[y]=[]);
            for(let x=0;x<Config.stageCols;x++){
                const puyo=line[x];
                if(puyo>=1&&puyo<=5){
                    this.setPuyo(x,y,puyo);
                    puyoCount++;
                }else line[x]=null;
            }
        }
        this.puyoCount=puyoCount;
    }
    static setPuyo(x,y,puyo){
        const puyoImage = PuyoImage.getPuyo(puyo);
        puyoImage.style.left = x * Config.puyoImgWidth + "px";
        puyo.Image.style.top = y * Config.puyoImgHeight + "px";
        this.stageElement.appendChild(puyoImage);
        this.board[y][x]={
            puyo: puyo,
            element: puyoImage
        }
    }
    static checkFall(){
        this.fallingPuyoList.length = 0;
        let isFalling = false;
        for(let y = Config.stageRows - 2;y >= 0; y--){
            const line = this.board[y];
            for(let x = 0;x < line.length;x++){
                if(!this.board[y][x])continue;
                if(!this.board[y+1][x]){
                    let cell = this.board[y][x];
                    let dst = y;
                    while(dst + 1 < Config.stageRows && this.board[dst+1][x]==null)dst++;
                    this.fallingPuyoList.push({
                        element: cell.element,
                        position: y * Config.puyoImgHeight,
                        destination: dst * Config.puyoImgHeight,
                        falling: true
                    });
                    isFalling = true;
                }
            }
        }
        return isFalling;
    }
    static fall(){
        let isFalling = false;
        for(const fallingPuyo of this.fallingPuyoList){
            if(!fallingPuyo.falling)continue;
            let position = fallingPuyo.position;
            position += Config.freeFallingSpeed;
            if(position >= fallingPuyo.destination){
                position = fallingPuyo.destination;
                fallingPuyo.falling = false;
            }else isFalling = true;
            fallingPuyo.element.style.top = position + 'px';
        }
        return isFalling;
    }
    static checkErase(startFrame){
        this.eraseStartFrame = startFrame;
        this.erasingPuyoInfoList.length = 0;
        const erasePuyoColor = {};
        const sequencePuyoInfoList = [];
        const existingPuyoInfoList = [];
        const checkSequentialPuyo = (x,y) => {
            const orig = this.board[y][x];
            if(!orig)return;
        }
        const puyo = this.board[y][x].puyo;
        sequencePuyoInfoList.push({
            x:x,
            y:y,
            cell: this.board[y][x]
        });
    }
}