
import {GameObject, MonoBehaviour} from "UnityEngine";
import {Button} from "UnityEngine.UI";
import MenuManager from "@assets/Experience/IdleTOT/Scripts/MenuManager";
import GameManager, {Biomes, GameValue} from "@assets/Experience/IdleTOT/Scripts/GameManager";
import BiomeManager from "@assets/Experience/IdleTOT/Scripts/BiomeManager";
import {TMP_Text} from "TMPro";



export default class ImprovementManager extends MonoBehaviour {

    @Header("Button Settings")
    @SerializeField public BuyButtons: Button[];
    @SerializeField public BuyMaxButtons: Button[];
    @SerializeField public LocalMoney: TMP_Text;

    @Header("Canvas Settings")
     public MenuManager: MenuManager;

    @Header("Cost Values")
    @SerializeField public cost: int[] = [10, 20, 30];


    private gameManager: GameManager;
    public BiomeManager: BiomeManager;

    public BiomeImproved: Biomes;
    public EnterBiomeButton: Button;


    //Start is called on the frame when a script is enabled just
    //before any of the Update methods are called the first time.
    private Start() : void {


        this.gameManager = GameManager.Instance;

        // Add a listener to the button to toggle the menu section
        for (let i = 0; i < this.BuyButtons.length; i++) {

            this.BuyButtons[i].onClick.AddListener(() => {
                this.BuyItem(this.cost[i]);
                this.ApplyImprovement(i);
            });
        }

        this.EnterBiomeButton.onClick.AddListener(() => {
            this.BuyItem(30);
            this.GoToZone(20);
            })
    }

    private BuyItem(cost: int) : void {
        //deduct cost from total score
        //update total score text
        this.MenuManager.BuyItem(cost);
    }


    private ApplyImprovement(index: int) : void {
        //apply improvement

        switch (index) {
            case 0:
                //Increase Spawn Rate
                this.gameManager.UpdateGameValue(GameValue.SPAWN_RATE, -0.5);
                break;
            case 1:
                //Increase Seconds won
                this.gameManager.UpdateGameValue(GameValue.SECONDS_PER_WIN, 1);
                break;
            case 2:
                //apply improvement 3
                break;
            default:
                break;
        }
    }

    private GoToZone(duration: number) : void {

        this.BiomeManager.switchBiome(this.BiomeImproved,duration);

    }

}
