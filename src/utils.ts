


export default class Utils {


    public fractionate(val: number, minVal: number, maxVal: number) {
        return (val - minVal)/(maxVal - minVal);
    }

    
    public modulate(val: number, minVal: number, maxVal: number, outMin: number, outMax: number) {
        const fr = this.fractionate(val, minVal, maxVal);
        const delta = outMax - outMin;
        return outMin + (fr * delta);
    }
    

    public avg(arr: Uint8Array){
        const total = arr.reduce((sum, b) => sum + b);
        return (total / arr.length);
    }
    
    
    public max(arr: Uint8Array) {
        return arr.reduce((a, b) => Math.max(a, b))
    }


} 


