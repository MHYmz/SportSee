export default class UserStats {
  constructor(infosGen, taskFlow, graphTrack, perf) {
    this.infosGen = infosGen;
    this._score = infosGen.score || infosGen.todayScore || 0;
    this.taskFlow = taskFlow;
    this.graphTrack = graphTrack;
    this._perf = perf 
  }

  set score(value) {
    this._score = value;
  }

  get score() {
    const scoreValue = this._score || 0;  // Si _score est undefined, on met 0 par défaut.
    return [
      {
        name: "",
        todayScore: 100, // Correspond à `dataKey` dans RadialBar
        fill: "#ffffff",
      },
      {
        name: "Score",
        todayScore: scoreValue * 100, // Convertit en pourcentage
        fill: "#ff0000",
      },
    ];
  }

  set perf(data) {
    this._perf = data;
  }

  get perf() {
    return {
      categories: this._perf?.kind || {},
      details: this._perf?.data || [],
    };
  }
}
