import {Color, GameObject, MonoBehaviour, Renderer, WaitForSeconds} from "UnityEngine";
import GameManager, {Biomes, GameValue} from "@assets/Experience/IdleTOT/Scripts/GameManager";
import HazardItemSpawner from "@assets/Experience/IdleTOT/Scripts/HazardItemSpawner";

export default class BiomeManager extends MonoBehaviour {

    private gameManager: GameManager;
    public itemSpawner: HazardItemSpawner;

    //the ground prefab for the TOT biome
    @SerializeField public Ground: GameObject;


    public  switchBiome(BiomeToSwitch :Biomes, duration: int) {

    console.log("Biome", BiomeToSwitch);
    this.gameManager.GameValues.set(GameValue.CURRENT_BIOME, BiomeToSwitch);

    this.updateEnvironment();

    if(this.gameManager.GameValues.get(GameValue.CURRENT_BIOME) != Biomes.TOT && duration > 0) {
        this.switchBiomeAfterDuration(duration);
    }

    }

    //Start is called on the frame when a script is enabled just
    //before any of the Update methods are called the first time.
    private Start() : void {
        this.gameManager = GameManager.Instance;
    }


    private updateEnvironment() {
        //this.itemSpawner.clearOtherBiomesAssets();
        console.log("I'm updating");
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



    //create a coroutine that will switch the biome after a certain duration
    private switchBiomeAfterDuration(duration: int) {
        this.StartCoroutine(this.switchBiomeAfterDurationCoroutine(duration));
    }

    private *switchBiomeAfterDurationCoroutine(duration: int) {
        yield new WaitForSeconds(duration);
        this.switchBiome(Biomes.TOT, -1);
    }
}
