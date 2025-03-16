import {GameObject, MonoBehaviour} from "UnityEngine";
import {Button} from "UnityEngine.UI";
import {TMP_Text} from "TMPro";
import GameManager, {GameValue} from "./GameManager";

export default class MenuManager extends MonoBehaviour {


    @Header("Menu Section References")
    @SerializeField private MenuSectionsPanel: GameObject;
    @SerializeField private MenuSections: GameObject[];

    @SerializeField private MenuSectionsButtons: Button[];

    //player total score text
    @SerializeField private totalScoreText: TMP_Text;

    public GameManager: GameManager;


    //Called when script instance is loaded
    private Awake() : void {}

    //Start is called on the frame when a script is enabled just
    //before any of the Update methods are called the first time.
    private Start() : void {
       // this.MenuSectionsPanel.SetActive(false);

        this.totalScoreText.text = this.GameManager.GameValues.get(GameValue.SCORE) + " s";

            // Add a listener to the button to toggle the menu section
            for (let i = 0; i < this.MenuSectionsButtons.length; i++) {
                let index = i;
                this.MenuSectionsButtons[i].onClick.AddListener(() => {
                    this.ToggleMenuSection(index);
                });
            }

            //set the score text to update with the CanvasManager score value
    }

    private ToggleMenuSection(sectionIndex: int) : void {
        for (let i = 0; i < this.MenuSections.length; i++) {
            this.MenuSections[i].SetActive(false);
        }
        this.MenuSections[sectionIndex].SetActive(true);
    }

    public UpdateTotalScore(score: int) : void {
        this.GameManager.GameValues.set(GameValue.SCORE, score);
        this.totalScoreText.text = score.toString() + " s";
    }

    public BuyItem(cost: int) : void {
        //deduct cost from total score
        //update total score text
        let currentScore = this.GameManager.GameValues.get(GameValue.SCORE);
        console.log("Buy Button Clicked : total Score" + currentScore + " cost " + cost);
        if((currentScore-cost) >= 0 ) {


            this.UpdateTotalScore(currentScore-cost);
        }

    }

    //TODO penser a mettre un gestionnaire de valeurs avec des listeners pour les valeurs qui changent pour une meilleure gestion

}
