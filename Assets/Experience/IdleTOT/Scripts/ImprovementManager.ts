
import {GameObject, MonoBehaviour} from "UnityEngine";
import {Button} from "UnityEngine.UI";
import MenuManager from "@assets/Experience/IdleTOT/Scripts/MenuManager";
import GameManager, {GameValue} from "@assets/Experience/IdleTOT/Scripts/GameManager";



export default class ImprovementManager extends MonoBehaviour {

    @Header("Button Settings")
    @SerializeField public BuyButtons: Button[];
    @SerializeField public BuyMaxButtons: Button[];

    @Header("Canvas Settings")
     public MenuManager: MenuManager;

    @Header("Cost Values")
    @SerializeField public cost: int[] = [10, 20, 30];


    private gameManager: GameManager;


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
    }
    private Awake() : void {


    }

    private onEnable(): void {

    }

    private BuyItem(cost: int) : void {
        //deduct cost from total score
        //update total score text
        //

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

}
