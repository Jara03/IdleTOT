import { GameObject, MonoBehaviour } from "UnityEngine";

/** This is an enumerator to describe a game state. */
export enum GameState {
    INITIAL,
    LOADING,
    GAME_PLAY,
    GAME_OVER
}

export enum GameValue {
    SCORE,
    PLAINES_SCORE,
    HIGH_SCORE,
    SPAWN_RATE,
    SECONDS_PER_WIN,
    CURRENT_BIOME
}
export enum Biomes {
    TOT,
    PLAINES,
    MINE,
    DESERT
}

export default class GameManager extends MonoBehaviour {

    /** This is an event that is triggered when the current GameState changes. */
    @NonSerialized public OnGameStateChange: GeniesEvent<[GameState]> = new GeniesEvent<[GameState]>();
    /** This is an instance of the GameManager singleton. */
    @NonSerialized public static Instance: GameManager;
    /** The game's current GameState value. */
    private gameState: GameState;

    public GameValues: Map<GameValue, number> = new Map<GameValue, number>();
    public Biomes:Biomes;
    Awake() {
        //Establishes the GameManager singleton instance
        if(GameManager.Instance == null) {
            GameManager.Instance = this;
        }else{
            GameObject.Destroy(this.gameObject);
        }


        this.GameValues.set(GameValue.SCORE, 30);
        this.GameValues.set(GameValue.PLAINES_SCORE, 0);
        this.GameValues.set(GameValue.HIGH_SCORE, 0);
        this.GameValues.set(GameValue.SPAWN_RATE, 5);
        this.GameValues.set(GameValue.SECONDS_PER_WIN, 1);
        this.GameValues.set(GameValue.CURRENT_BIOME, Biomes.TOT);
    }

    Start() {
        //Set the game state to LOADING at the Start
        //this.ChangeGameState(GameState.LOADING);

    }

    /** @returns the game's current GameState value */
    public GetGameState(): GameState {
        return this.gameState;
    }

    /**
     * This will set the current GameState value to a new value and trigger an event.
     * @param newState the new GameState value
     * @returns will return early if the new value equals the current value
     */
    public ChangeGameState(newState: GameState) {
        if (newState == this.gameState) {
            return;
        }
        console.log("New Game State Change: ", newState)
        this.OnGameStateChange.trigger(newState);
        this.gameState = newState;
    }

    public UpdateGameValue(value: GameValue, amount: number) {
        this.GameValues.set(value, this.GameValues.get(value) + amount);
    }


}
