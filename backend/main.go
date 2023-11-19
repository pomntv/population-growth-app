package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func InitializeService() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	clientOptions := options.Client().ApplyURI("mongodb+srv://render:render1234@cluster0.nooipqq.mongodb.net/Popuation_growth?retryWrites=true&w=majority")
	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
}

type PopulationData struct {
	CountryName               string      `json:"countryName" bson:"Country name"`
	Year                      int         `json:"year" bson:"Year"`
	Population                interface{} `json:"population" bson:"Population"`
	PopulationChildrenUnder1  interface{} `json:"populationChildrenUnder1" bson:"Population of children under the age of 1"`
	PopulationChildrenUnder5  interface{} `json:"populationChildrenUnder5" bson:"Population of children under the age of 5"`
	PopulationChildrenUnder15 interface{} `json:"populationChildrenUnder15" bson:"Population of children under the age of 15"`
	PopulationUnder25         interface{} `json:"populationUnder25" bson:"Population under the age of 25"`
	PopulationAged15To64      interface{} `json:"populationAged15To64" bson:"Population aged 15 to 64 years"`
	PopulationOlderThan15     interface{} `json:"populationOlderThan15" bson:"Population older than 15 years"`
	PopulationOlderThan18     interface{} `json:"populationOlderThan18" bson:"Population older than 18 years"`
	PopulationAtAge1          interface{} `json:"populationAtAge1" bson:"Population at age 1"`
	PopulationAged1To4        interface{} `json:"populationAged1To4" bson:"Population aged 1 to 4 years"`
	PopulationAged5To9        interface{} `json:"populationAged5To9" bson:"Population aged 5 to 9 years"`
	PopulationAged10To14      interface{} `json:"populationAged10To14" bson:"Population aged 10 to 14 years"`
	PopulationAged15To19      interface{} `json:"populationAged15To19" bson:"Population aged 15 to 19 years"`
	PopulationAged20To29      interface{} `json:"populationAged20To29" bson:"Population aged 20 to 29 years"`
	PopulationAged30To39      interface{} `json:"populationAged30To39" bson:"Population aged 30 to 39 years"`
	PopulationAged40To49      interface{} `json:"populationAged40To49" bson:"Population aged 40 to 49 years"`
	PopulationAged50To59      interface{} `json:"populationAged50To59" bson:"Population aged 50 to 59 years"`
	PopulationAged60To69      interface{} `json:"populationAged60To69" bson:"Population aged 60 to 69 years"`
	PopulationAged70To79      interface{} `json:"populationAged70To79" bson:"Population aged 70 to 79 years"`
	PopulationAged80To89      interface{} `json:"populationAged80To89" bson:"Population aged 80 to 89 years"`
	PopulationAged90To99      interface{} `json:"populationAged90To99" bson:"Population aged 90 to 99 years"`
	PopulationOlderThan100    interface{} `json:"populationOlderThan100" bson:"Population older than 100 years"`
}

func GetAllPopulation(w http.ResponseWriter, r *http.Request) {
	databasename := "Population_growth"
	collectionname := "TestfromSynergy"
	collection := client.Database(databasename).Collection(collectionname)

	// Fetching data from MongoDB
	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Println("Error fetching data from MongoDB:", err)
		http.Error(w, "Failed to fetch data", http.StatusInternalServerError)
		return
	}

	var Populations []PopulationData
	if err = cursor.All(context.TODO(), &Populations); err != nil {
		log.Println("Failed to parse data", err)
		http.Error(w, "Failed to parse data", http.StatusInternalServerError)
		return
	}

	// Processing each document
	for i, data := range Populations {
		switch v := data.PopulationAtAge1.(type) {
		case float64:
			// Handle float64 type
			Populations[i].PopulationAtAge1 = int(v)
		case int:
			// int type
		default:
			// Handle unexpected type
		}
	}

	// Sending the response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Populations)
}

func main() {
	InitializeService()
	defer client.Disconnect(context.Background())

	mux := http.NewServeMux()
	mux.HandleFunc("/api/population", GetAllPopulation)

	handler := cors.Default().Handler(mux)

	if err := http.ListenAndServe(":8081", handler); err != nil {
		log.Fatalf("Error starting server: %s\n", err)
	}
}
