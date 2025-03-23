import {
    Color,
    Coroutine,
    GameObject,
    Mathf,
    MonoBehaviour,
    Object,
    Random, Renderer,
    Transform,
    Vector3,
    WaitForSeconds
} from "UnityEngine";
import GameManager, {GameState, GameValue, Biomes} from "./GameManager";
import {ArrayList} from "System.Collections";

export default class HazardItemSpawner extends MonoBehaviour {

    @Header("Enemy Settings")
    @SerializeField public TotItem: GameObject;
    @SerializeField public PlainesItem: GameObject;
    @SerializeField public MineItem: GameObject;
    @SerializeField public DesertItem: GameObject;
    private spawnPosition: Vector3 = new Vector3(0, -3, 0);

    private gameManager: GameManager;

    public ItemList: GameObject[] = [];

    /** This coroutine will spawn enemies over time. */
    private coroutine: Coroutine;

    Start() {
        //Get GameManager singleton and add a listener to OnGameStateChange event
        this.gameManager = GameManager.Instance;
        this.gameManager.OnGameStateChange.addListener(this.CheckGameState);
        this.coroutine = this.StartCoroutine(this.SpawnItems());


    }


    private CheckGameState(newState: GameState) {
        switch(newState) {
            case GameState.GAME_PLAY:
                this.OnGamePlay();
                break;
            case GameState.GAME_OVER:
                break;
        }
    }

    /** This will manage the enemies once the game starts. */
    private OnGamePlay() {

        //this.coroutine = this.StartCoroutine(this.SpawnItems());
    }



    /** Spawns the initial pool of GameObjects and deactivates them. */
    private CreateItem() {
        let temp = null;
        temp = Object.Instantiate(this.getCurrentBiomeItem(), this.transform) as GameObject;

        temp.SetActive(false);
            this.ItemList.push(temp);
            return temp;
    }

    private getCurrentBiomeItem() {
        switch (this.gameManager.GameValues.get(GameValue.CURRENT_BIOME)) {
            case (Biomes.TOT):
                return this.TotItem;
            case (Biomes.PLAINES):
                return this.PlainesItem;
            case (Biomes.MINE):
                return this.MineItem;
            case (Biomes.DESERT):
                return this.DesertItem;
            default:
                return this.TotItem;
        }
    }

    /** Coroutine that spawns a new enemy from the pool. */
    private *SpawnItems() {
        while(true) {
            yield null;
            //Get a deactivated enemy from the pool
            let item = this.CreateItem();
            if (item) {
                //Spawn in a random lane and activate
                item.transform.position = new Vector3(Mathf.Floor(Random.Range(-30, 30)), -3, Mathf.Floor(Random.Range(-30, 30)));
                item.SetActive(true);
            }
            yield new WaitForSeconds(this.gameManager.GameValues.get(GameValue.SPAWN_RATE));
        }
    }

    public clearOtherBiomesAssets() {
        //check list of gameObjects and set them to inactive if they are not the current prefab used
        for (let i = 0; i < this.ItemList.length; i++) {
            //this.ItemList[i].SetActive(true);
            if(this.ItemList[i].gameObject != undefined && this.ItemList[i].gameObject != null) {

                if(this.ItemList[i].GetComponent<Renderer>().sharedMaterial != this.getCurrentBiomeItem().GetComponent<Renderer>().sharedMaterial){
                    this.ItemList[i].SetActive(false);
                }else{
                    this.ItemList[i].SetActive(true);
                }
            }
        }
    }

    public getNearestItemPosition(playerPosition: Vector3): Transform {
        let nearestItem: GameObject = null;
        let nearestDistance: number = 1000;

        for (let i = 0; i < this.transform.childCount; i++) {
            let item = this.transform.GetChild(i).gameObject;
            if (item.activeSelf) {
                let distance = Vector3.Distance(playerPosition, item.transform.position);
                if (distance < nearestDistance) {
                    nearestItem = item;
                    nearestDistance = distance;
                }
            }
        }
        return nearestItem.transform;
    }


    /** This will manage the enemies once the game ends. */
    private OnGameOver() {
        if(this.coroutine) {
            this.StopCoroutine(this.coroutine);
        }
    }
}
