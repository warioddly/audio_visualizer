


export default class Noise3D {


    private fade(t: number) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
    
    private lerp(t: number, a: number, b: number) {
        return a + t * (b - a);
    }
    
    private grad(hash: number, x: number, y: number, z: number) {
        const h = hash & 15; // Convert low 4 bits of hash code into 12 gradient directions.
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    
    public noise(x: number, y: number, z: number) {

        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;

        const fade = this.fade;
        const lerp = this.lerp;
        const grad = this.grad;
    
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
    
        const u = fade(x);
        const v = fade(y);
        const w = fade(z);
    
        const hash = (X) + (Y) * 256 + (Z) * 256 * 256;
        const g000 = grad(hash, x, y, z);
        const g001 = grad(hash + 1, x - 1, y, z);
        const g010 = grad(hash + 256, x, y - 1, z);
        const g011 = grad(hash + 257, x - 1, y - 1, z);
        const g100 = grad(hash + 256 * 256, x, y, z - 1);
        const g101 = grad(hash + 256 * 256 + 1, x - 1, y, z - 1);
        const g110 = grad(hash + 256 * 256 + 256, x, y - 1, z - 1);
        const g111 = grad(hash + 256 * 256 + 257, x - 1, y - 1, z - 1);
    
        const n000 = g000 * (x) + g000 * (y) + g000 * (z);
        const n001 = g001 * (x - 1) + g001 * (y) + g001 * (z);
        const n010 = g010 * (x) + g010 * (y - 1) + g010 * (z);
        const n011 = g011 * (x - 1) + g011 * (y - 1) + g011 * (z);
        const n100 = g100 * (x) + g100 * (y) + g100 * (z - 1);
        const n101 = g101 * (x - 1) + g101 * (y) + g101 * (z - 1);
        const n110 = g110 * (x) + g110 * (y - 1) + g110 * (z - 1);
        const n111 = g111 * (x - 1) + g111 * (y - 1) + g111 * (z - 1);
    
        return lerp(w, lerp(v, lerp(u, n000, n001), lerp(u, n010, n011)), lerp(v, lerp(u, n100, n101), lerp(u, n110, n111)));
    }
    
} 