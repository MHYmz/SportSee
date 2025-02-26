export default class UserStats {
  constructor(infosGen = {}, taskFlow = [], graphTrack = [], perf = {}) {
      this.infosGen = infosGen;

      this._score = infosGen.todayScore ?? infosGen.score ?? 0;

      console.log("Score dans UserStats (avant conversion) : ", this._score); 

      this.taskFlow = taskFlow;
      this.graphTrack = graphTrack;
      this._perf = perf;
  }
get score() {
    const scoreValue = this._score ?? 0; // Par défaut, on met 0 si aucune valeur n'est fournie.
    console.log("scoreValue dans le getter :", scoreValue); 

    return [
        {
            name: "Total",
            todayScore: scoreValue * 100, // Valeur fixe pour l'arrière-plan du graphique
            fill: "#ff0000",  
        },
      
    ];
}


  // Setter pour les performances
  set perf(data) {
      this._perf = data;
  }

  // Getter pour les performances, convertit les données en format exploitable
  get perf() {
      return {
          categories: this._perf?.kind || {},
          details: this._perf?.data?.map((item) => ({
              value: item.value,
              category: this._perf.kind ? this._perf.kind[item.kind] : "Inconnu", 
          })) || [],
          data: this._perf?.data
      };
  }
}
