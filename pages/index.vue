<template>
  <div id="app">
      <div class="nav">
        <p> <span class="turn"> {{ turn }} </span>  の番です。 </p>
        <p> Black: {{ $store.getters.getScore[0] }} </p> 
        <p> White: {{ $store.getters.getScore[1] }} </p>  
 

      </div>
      <div class="cell" v-for="(cell,index) in $store.state.cellData"
      :key="index" @click="putCell(cell,index)">
        <div class="stone" v-if="cell == -1"
        style="background:black"
        />
        <div class="stone" v-if="cell == 1"
        style="background:white"
        />
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      targetCell:0,
      cellStatus:[],
      turn:'black'
    }
  },

  methods: {
    putCell(cell,index){
      if(cell!==0)return //既に置いてあるマスだった場合処理されない

      //周辺のセルの状態を確認して、配列に格納
      const cellData = this.$store.state.cellData
      this.targetCell=index

      if(index == 0){ //左上角の場合
        this.cellStatus=[
          { index: 1, stone: cellData[1] }, //右隣
          { index: 8, stone: cellData[8] }, //真下
          { index: 9, stone: cellData[9] }, //斜右下
        ]
        this.judge();
      }
      if(index > 0 && index < 7){ //上列の場合
        this.cellStatus=[
          { index: index-1, stone: cellData[index-1] }, //左隣
          { index: index+1, stone: cellData[index+1] }, //右隣
          { index: index+7, stone: cellData[index+7] }, //斜左下
          { index: index+8, stone: cellData[index+8] }, //真下
          { index: index+9, stone: cellData[index+9] }, //斜右下
        ]
        this.judge();
      }
      if(index == 7){ //右上角の場合
        this.cellStatus=[
          { index: 6, stone: cellData[6] }, //左隣
          { index: 14, stone: cellData[14] }, //斜左下
          { index: 15, stone: cellData[15] }, //真下
        ]
        this.judge();
      }
      if(index < 56 && index % 8 == 0){ //左列の場合
        this.cellStatus=[
          { index: index-8, stone: cellData[index-8] }, //真上
          { index: index-7, stone: cellData[index-7] }, //右斜上
          { index: index+1, stone: cellData[index+1] }, //右隣
          { index: index+9, stone: cellData[index+9] }, //右斜下
          { index: index+8, stone: cellData[index+8] }, //真下
        ]
        this.judge();
      }
      if(index == 56){ //左下角の場合
        this.cellStatus=[
          { index: 48, stone: cellData[48] }, //左隣
          { index: 49, stone: cellData[49] }, //斜左下
          { index: 57, stone: cellData[57] }, //真下
        ]
        this.judge();
      }
      if(index > 56 && index < 63){ //下列の場合
        this.cellStatus=[
          { index: index-1, stone: cellData[index-1] }, //左隣
          { index: index-9, stone: cellData[index-9] }, //左斜上
          { index: index-8, stone: cellData[index-8] }, //真上
          { index: index-7, stone: cellData[index-7] }, //右斜上
          { index: index+1, stone: cellData[index+1] }, //右隣
        ]
        this.judge();
      }
      if(index == 63){ //右下角の場合
        this.cellStatus=[
          { index: 54, stone: cellData[54] }, //斜左上
          { index: 55, stone: cellData[55] }, //真上
          { index: 62, stone: cellData[62] }, //左隣
        ]
        this.judge();
      }
      if(index % 8 == 7){ //右列の場合
        this.cellStatus=[
          { index: index-9, stone: cellData[index-9] }, //右斜上
          { index: index-8, stone: cellData[index-8] }, //真上
          { index: index-1, stone: cellData[index-1] }, //右隣
          { index: index+7, stone: cellData[index+7] }, //右斜下
          { index: index+8, stone: cellData[index+8] }, //真下
        ]
        this.judge();
      }
      if(index>=9 && index<=14 || index>=17 && index<=22 || index>=25 && index<=30 || 
         index>=33 && index<=38 || index>=41 && index<=46 || index>=49 && index<=54){
          this.cellStatus=[
          { index: index-9, stone: cellData[index-9] }, //左斜上
          { index: index-8, stone: cellData[index-8] }, //真上
          { index: index-7, stone: cellData[index-7] }, //右斜上
          { index: index-1, stone: cellData[index-1] }, //左隣
          { index: index+1, stone: cellData[index+1] }, //右隣
          { index: index+7, stone: cellData[index+7] }, //左斜下
          { index: index+8, stone: cellData[index+8] }, //真下
          { index: index+9, stone: cellData[index+9] }, //右斜下
        ]
        this.judge();
      }

    }, //putCellの閉じタグ

    //置けるかどうかの一次判定（黒:-1、白:1）方向別に仕分け
    judge(){
      if(this.turn=='black'){
        const data = this.cellStatus.filter(cell=>cell.stone==1); //白の駒を抽出
        if(data.length == 0)return;

        for(let i=0; i<data.length; i++){
          if(data[i].index - this.targetCell==-9){this.topLeft(data[i].index)}
          if(data[i].index - this.targetCell==-8){this.top(data[i].index)}
          if(data[i].index - this.targetCell==-7){this.topRight(data[i].index)}
          if(data[i].index - this.targetCell==-1){this.left(data[i].index)}
          if(data[i].index - this.targetCell==1){this.right(data[i].index)}
          if(data[i].index - this.targetCell==7){this.bottomLeft(data[i].index)}
          if(data[i].index - this.targetCell==8){this.bottom(data[i].index)}
          if(data[i].index - this.targetCell==9){this.bottomRight(data[i].index)}
        }
        this.turn='white' //白の番にする
      }else if(this.turn=='white'){
        const data = this.cellStatus.filter(cell=>cell.stone==-1); //黒の駒を抽出
        if(data.length == 0)return;
        
        for(let i=0; i<data.length; i++){
          if(data[i].index - this.targetCell==-9){this.topLeft(data[i].index)}
          if(data[i].index - this.targetCell==-8){this.top(data[i].index)}
          if(data[i].index - this.targetCell==-7){this.topRight(data[i].index)}
          if(data[i].index - this.targetCell==-1){this.left(data[i].index)}
          if(data[i].index - this.targetCell==1){this.right(data[i].index)}
          if(data[i].index - this.targetCell==7){this.bottomLeft(data[i].index)}
          if(data[i].index - this.targetCell==8){this.bottom(data[i].index)}
          if(data[i].index - this.targetCell==9){this.bottomRight(data[i].index)}
        }
        this.turn='black' //黒の番にする
      }
    },



    // 置けるかどうかの二次判定処理（方向別８種類）とめくる開始地点、終了地点をstoreに伝達
    topLeft(data){
      if(this.$store.state.cellData[data-9] == 0)return
      const target = this.$store.state.cellData

      if(target[data] == 1){ //手が黒で、白をめくる場合
      
        while(target[data] == 1 && data % 8 !== 0){
          data -= 9
          if(target[data] == -1){ //黒(-1)があったら（挟めたら）
            const stoneData = [this.targetCell, data + 9] //[開始地点、終了地点]
            this.$store.commit('topLeft',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }

      }else if(target[data] == -1){ //手が白で、黒をめくる場合
      
        while(target[data] == -1 && data % 8 !== 0){
          data -= 9
          if(target[data] == 1){ //白(1)があったら（挟めたら）
            const stoneData = [this.targetCell, data + 9] //[開始地点、終了地点]
            this.$store.commit('topLeft',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }
      }
    },

    top(data){
      if(this.$store.state.cellData[data-8] == 0)return
      const target = this.$store.state.cellData

      if(target[data] == 1){ //手が黒で、白をめくる場合
      
        while(target[data] == 1){
          data -= 8
          if(target[data] == -1){ //黒(-1)があったら（挟めたら）
            const stoneData = [this.targetCell, data + 8] //[開始地点、終了地点]
            this.$store.commit('top',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }

      }else if(target[data] == -1){ //手が白で、黒をめくる場合
      
        while(target[data] == -1){
          data -= 8
          if(target[data] == 1){ //白(1)があったら（挟めたら）
            const stoneData = [this.targetCell, data + 8] //[開始地点、終了地点]
            this.$store.commit('top',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }
      }
    },

    topRight(data){
      if(this.$store.state.cellData[data-7] == 0)return
      const target = this.$store.state.cellData

      if(target[data] == 1){ //手が黒で、白をめくる場合
      
        while(target[data] == 1 && data % 8 !== 7){
          data -= 7
          if(target[data] == -1){ //黒(-1)があったら（挟めたら）
            const stoneData=[this.targetCell, data + 7] //[開始地点、終了地点]
            this.$store.commit('topRight',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }

      }else if(target[data] == -1){ //手が白で、黒をめくる場合
      
        while(target[data] == -1 && data % 8 !== 7){
          data -= 7
          if(target[data] == 1){ //白(1)があったら（挟めたら）
            const stoneData = [this.targetCell, data + 7] //[開始地点、終了地点]
            this.$store.commit('topRight',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }
      }
    },

    left(data){
      if(this.$store.state.cellData[data-1] == 0)return
      const target = this.$store.state.cellData

      if(target[data] == 1){ //手が黒で、白をめくる場合
      
        while(target[data] == 1 && data % 8 !== 0){
          data -= 1
          if(target[data] == -1){ //黒(-1)があったら（挟めたら）
            const stoneData=[this.targetCell, data + 1] //[開始地点、終了地点]
            this.$store.commit('left',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }

      }else if(target[data] == -1){ //手が白で、黒をめくる場合
      
        while(target[data] == -1 && data % 8 !== 0){
          data -= 1
          if(target[data] == 1){ //白(1)があったら（挟めたら）
            const stoneData = [this.targetCell, data + 1] //[開始地点、終了地点]
            this.$store.commit('left',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }
      }
    },

    right(data){
      if(this.$store.state.cellData[data+1] == 0)return
      const target = this.$store.state.cellData

      if(target[data] == 1){ //手が黒で、白をめくる場合
      
        while(target[data] == 1 && data % 8 !== 7){
          data += 1
          if(target[data] == -1){ //黒(-1)があったら（挟めたら）
            const stoneData=[this.targetCell, data - 1] //[開始地点、終了地点]
            this.$store.commit('right',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }

      }else if(target[data] == -1){ //手が白で、黒をめくる場合
      
        while(target[data] == -1 && data % 8 !== 7){
          data += 1
          if(target[data] == 1){ //白(1)があったら（挟めたら）
            const stoneData = [this.targetCell, data - 1] //[開始地点、終了地点]
            this.$store.commit('right',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }
      }
    },

    bottomLeft(data){
      if(this.$store.state.cellData[data+7] == 0)return
      const target = this.$store.state.cellData

      if(target[data] == 1){ //手が黒で、白をめくる場合
      
        while(target[data] == 1 && data % 8 !== 0){
          data += 7
          if(target[data] == -1){ //黒(-1)があったら（挟めたら）
            const stoneData=[this.targetCell, data - 7] //[開始地点、終了地点]
            this.$store.commit('bottomLeft',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }

      }else if(target[data] == -1){ //手が白で、黒をめくる場合
      
        while(target[data] == -1 && data % 8 !== 0){
          data += 7
          if(target[data] == 1){ //白(1)があったら（挟めたら）
            const stoneData = [this.targetCell, data - 7] //[開始地点、終了地点]
            this.$store.commit('bottomLeft',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }
      }
    },

    bottom(data){
      if(this.$store.state.cellData[data+8] == 0)return
      const target = this.$store.state.cellData

      if(target[data] == 1){ //手が黒で、白をめくる場合
      
        while(target[data] == 1){
          data += 8
          if(target[data] == -1){ //黒(-1)があったら（挟めたら）
            const stoneData=[this.targetCell, data - 8] //[開始地点、終了地点]
            this.$store.commit('bottom',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }

      }else if(target[data] == -1){ //手が白で、黒をめくる場合
      
        while(target[data] == -1){
          data += 8
          if(target[data] == 1){ //白(1)があったら（挟めたら）
            const stoneData = [this.targetCell, data - 8] //[開始地点、終了地点]
            this.$store.commit('bottom',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }
      }
    },

    bottomRight(data){
      if(this.$store.state.cellData[data+9] == 0)return
      const target = this.$store.state.cellData

      if(target[data] == 1){ //手が黒で、白をめくる場合
      
        while(target[data] == 1 && data % 8 !== 7){
          data += 9
          if(target[data] == -1){ //黒(-1)があったら（挟めたら）
            const stoneData=[this.targetCell, data - 9] //[開始地点、終了地点]
            this.$store.commit('bottomRight',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }

      }else if(target[data] == -1){ //手が白で、黒をめくる場合
      
        while(target[data] == -1 && data % 8 !== 7){
          data += 9
          if(target[data] == 1){ //白(1)があったら（挟めたら）
            const stoneData = [this.targetCell, data - 9] //[開始地点、終了地点]
            this.$store.commit('bottomRight',stoneData)
            break
          }else if(target[data] == 0){
            break
          }
        }
      }
    },

} //methodsの閉じタグ
} //export defaultの閉じタグ
</script>

<style scoped>

#app {
    width: 600px;
    height: 600px;
    background: green;
    margin: 50px auto;
}

.cell {
    width: 75px;
    height: 75px;
    border: 1px solid black;
    cursor: pointer;

    /* border込みで100pxにする処理 */
    box-sizing: border-box;
    position: relative;
    float: left;
}

.nav {
    position: absolute;
    top: 20px;
    display: flex;
}

.nav > p{
  margin-right: 25px;
}

.nav p:nth-child(1){
  margin-right: 100px;
}

.turn{
  font-weight: bold;
  font-size:16px;
}

.stone {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
