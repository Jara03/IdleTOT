
import {Color, GameObject, MonoBehaviour, Renderer} from "UnityEngine";
import GameManager, {Biomes, GameValue} from "@assets/Experience/IdleTOT/Scripts/GameManager";
export default class BiomeManager extends MonoBehaviour {

    private timeInCurrentBiome: number;
    private gameManager: GameManager;

    //the ground prefab for the TOT biome
    @SerializeField public Ground: GameObject;


    public  switchBiome(BiomeToSwitch :Biomes, duration: int) {

    console.log("Biome", BiomeToSwitch);
    this.gameManager.UpdateGameValue(GameValue.CURRENT_BIOME, BiomeToSwitch);
    this.timeInCurrentBiome = duration
        this.updateEnvironment();

    }

    //Start is called on the frame when a script is enabled just
    //before any of the Update methods are called the first time.
    private Start() : void {
        this.gameManager = GameManager.Instance;
    }

    //Update is called every frame, if the MonoBehaviour is enabled.
    private Update() : void {}

    private updateEnvironment() {
        console.log(this.gameManager.GameValues.get(GameValue.CURRENT_BIOME));
        switch(this.gameManager.GameValues.get(GameValue.CURRENT_BIOME)) {
            case Biomes.TOT:
                //change material of ground to TOT material
                this.Ground.GetComponent<Renderer>().material.color = Color.gray;
                break;
            case Biomes.PLAINES:
                //update environment to plaines
                this.Ground.GetComponent<Renderer>().material.color = Color.green;
                break;
            case Biomes.MINE:
                //update environment to mine
                this.Ground.GetComponent<Renderer>().material.color = Color.black;
                break;
            case Biomes.DESERT:
                //update environment to desert
                this.Ground.GetComponent<Renderer>().material.color = Color.white;
                break;
        }
    }
}
