//Import du framework express
var express = require("express");
//Creation d'un objet express
var application = express();

//Recup de bodyparser
var bodyparser = require("body-parser");

// process.env.PORT lets the port be set by Heroku
//var port = process.env.PORT || 8080;

application.listen(13107,"192.168.1.59");
//application.listen(port,"https://listemovies.herokuapp.com");

//application.listen(port, function() {
//    console.log('Our app is running on http://localhost:' + port);
//});

application.get('/',
	function(request,response){
		response.send("le git url très fort");
	}
);

application.use(bodyparser.json());
application.use(bodyparser.urlencoded({
    extended: true
}));

//Liste de films
application.get('/films',
	function(request,response){
		response.header('Access-Control-Allow-Origin','*');//
		//Chainage reponse du serveur: status puis reponse
		response.header('Content-Type','application/json');
		response.status(200).json(listeDeFilms);
	}
);

//Recuperer un seul film
application.get('/films/:id',
    function(request,response){

            response.header('Access-Control-Allow-Origin','*');//

            let idFilm = parseInt(request.params.id);
            let film;
            var flag = false;

            for(var i = 0 ; i < listeDeFilms.length ; i++){
                    if(listeDeFilms[i].id === idFilm){
                        film = listeDeFilms[i];
                        flag = true;
                    }
            }

            //Chainage reponse du serveur: status puis reponse
            if(flag === true){
                response.header('Content-Type','application/json');
                response.status(200).json(film);
            }else{
            response.header('Content-Type','text/plain');
            response.status(404).send("Le film est inconnu");
        }
    }
);

//AJOUTER UN FILM

application.post('/films/',
    function(request,response){
        
        response.header('Access-Control-Allow-Origin','*');
        
        var film = request.body;
        
        film['id'] = generateID();
        
         listeDeFilms.push(film);

        response.header('Content-Type','application/json');   
        
        response.status(200).json(listeDeFilms);
    }
);

//Supprimer un film

application.delete('/films/:id', function(request,response){
         response.header('Access-Control-Allow-Origin','*');

            let idFilm = parseInt(request.params.id);
            var flag = false;

            for(var i = 0 ; i < listeDeFilms.length ; i++){
                    if(listeDeFilms[i].id === idFilm){
                       listeDeFilms.splice(i,1);
                        flag = true;
                    }
            }

            //Chainage reponse du serveur: status puis reponse
            if(flag === true){
                response.header('Content-Type','application/json');
                response.status(200).json(listeDeFilms);
            }else{
            response.header('Content-Type','text/plain');
            response.status(404).send("Le film est inconnu");
        }
});
				 
function generateID(){
    var idMax = 0;
    for(var i in listeDeFilms){
        idMax = (listeDeFilms[i].id > idMax)?listeDeFilms[i].id : idMax;
    }
    
    return idMax + 1;
};	


				 
var listeDeFilms = [
	{
		id: 1,
		titre: "Abyss",
		genre: "Science-fiction",
		annee: "1998",
		realisateur: "James Cameron",
		acteurs: "Ed Harris, Mary Elizabeth Mastrantonio, Michael Biehn",
		synopsis: "Un commando de la Marine américaine débarque à bord de la station de forage sous-marine DeepCore, afin de porter secours à un sous-marin échoué dans les profondeurs. L'équipe de Bud Brigman accueille ces nouveaux arrivants, ainsi que Lindsey, future ex-femme de Bud. Alors que les travaux de récupération commencent autour du submersible naufragé, l'équipage de DeepCore doit faire face à des phénomènes inexpliqués. Et s'ils n'étaient pas seuls, dans les abysses ?",
		trailer: "https://www.youtube.com/embed/4zbpL3LeW7k"
	},
	{
		id: 2,
		titre: "Avengers: Infinity War",
		genre: "Action",
		annee: "2018",
		realisateur: "Joe Russo, Anthony Russo",
		acteurs: "Robert Downey Jr., Chris Hemsworth, Mark Ruffalo",
		synopsis: "Les Avengers et leurs alliés devront être prêts à tout sacrifier pour neutraliser le redoutable Thanos avant que son attaque éclair ne conduise à la destruction complète de l’univers.",
		trailer: "https://www.youtube.com/embed/QwievZ1Tx-8"
	},
	{
		id: 3,
		titre: "Carnivores",
		genre: "Thriller",
		annee: "2018",
		realisateur: "Jérémie Renier, Yannick Renier",
		acteurs: "Leïla Bekhti, Zita Hanrot, Bastien Bouillon",
		synopsis: "Mona rêve depuis toujours d’être comédienne. Au sortir du Conservatoire, elle est promise à un avenir brillant mais c’est Sam, sa sœur cadette, qui se fait repérer et devient rapidement une actrice de renom. À l’aube de la trentaine, à court de ressources, Mona est contrainte d’emménager chez sa sœur qui, fragilisée par un tournage éprouvant, lui propose de devenir son assistante. Sam néglige peu à peu son rôle d'actrice, d'épouse, de mère et finit par perdre pied. Ces rôles que Sam délaisse, Mona comprend qu'elle doit s'en emparer.",
		trailer: "https://www.youtube.com/embed/mGRST9V1JNI"
	},
	{
		id: 4,
		titre: "Dans la brume",
		genre: "Science-fiction",
		annee: "2018",
		realisateur: "Daniel Roby",
		acteurs: "Romain Duris, Olga Kurylenko, Fantine Harduin",
		synopsis: "Le jour où une étrange brume mortelle submerge Paris, des survivants trouvent refuge dans les derniers étages des immeubles et sur les toits de la capitale. Sans informations, sans électricité, sans eau ni nourriture, une petite famille tente de survivre à cette catastrophe... Mais les heures passent et un constat s'impose : les secours ne viendront pas et il faudra, pour espérer s’en sortir, tenter sa chance dans la brume...",
		trailer: "https://www.youtube.com/embed/t-Zyjlm1SVY"
	},
	{
		id: 5,
		titre: "Escobar",
		genre: "Drame",
		annee: "2018",
		realisateur: "Fernando León de Aranoa",
		acteurs: "Javier Bardem, Penélope Cruz, Peter Sarsgaard",
		synopsis: "Impitoyable et cruel chef du cartel de Medellin, Pablo Escobar est le criminel le plus riche de l’Histoire avec une fortune de plus de 30 milliards de dollars. 'L’empereur de la cocaïne' met la Colombie à feu et à sang dans les années 80 en introduisant un niveau de violence sans précédent dans le commerce de la drogue. Fascinée par son charisme et son pouvoir, la très célèbre journaliste Virginia Vallejo, va s’apercevoir qu’on ne s’approche pas de l’homme le plus dangereux du monde impunément...",
		trailer: "https://www.youtube.com/embed/q1heAgT16fg"
	},
	{
		id: 6,
		titre: "La forme de l'eau",
		genre: "Fantastique",
		annee: "2018",
		realisateur: "Guillermo del Toro",
		acteurs: "Sally Hawkins, Michael Shannon, Richard Jenkins",
		synopsis: "Modeste employée d’un laboratoire gouvernemental ultrasecret, Elisa mène une existence solitaire, d’autant plus isolée qu’elle est muette. Sa vie bascule à jamais lorsqu’elle et sa collègue Zelda découvrent une expérience encore plus secrète que les autres…",
		trailer: "https://www.youtube.com/embed/e5AW-_ZPpDg"
	},
	{
		id: 7,
		titre: "Larguées",
		genre: "Comédie",
		annee: "2018",
		realisateur: "Eloïse Lang",
		acteurs: "Miou-Miou, Camille Cottin, Camille Chamoux",
		synopsis: "Rose et Alice sont deux sœurs très différentes. Rose est libre et rock n’roll. Alice est rangée et responsable. Elles ne sont d’accord sur rien, à part sur l’urgence de remonter le moral de Françoise, leur mère, fraîchement larguée par leur père pour une femme beaucoup plus jeune. La mission qu’elles se sont donnée est simple « sauver maman » et le cadre des opérations bien défini : un club de vacances sur l’Ile de la Réunion…",
		trailer: "https://www.youtube.com/embed/DA-A6oGYxeA"
	},
	{
		id: 8,
		titre: "Les Animaux fantastiques 2",
		genre: "Fantastique",
		annee: "2018",
		realisateur: "David Yates",
		acteurs: "Eddie Redmayne, Katherine Waterston, Dan Fogler",
		synopsis: "1927. Quelques mois après sa capture, le célèbre sorcier Gellert Grindelwald s'évade comme il l'avait promis et de façon spectaculaire. Réunissant de plus en plus de partisans, il est à l'origine d'attaque d'humains normaux par des sorciers et seul celui qu'il considérait autrefois comme un ami, Albus Dumbledore, semble capable de l'arrêter. Mais Dumbledore va devoir faire appel au seul sorcier ayant déjoué les plans de Grindelwald auparavant : son ancien élève Norbert Dragonneau. L'aventure qui les attend réunit Norbert avec Tina, Queenie et Jacob, mais cette mission va également tester la loyauté de chacun face aux nouveaux dangers qui se dressent sur leur chemin, dans un monde magique plus dangereux et divisé que jamais.",
		trailer: "https://www.youtube.com/embed/fIS3D9qTuvs"
	},
	{
		id: 9,
		titre: "Taxi 5",
		genre: "Comédie",
		annee: "2018",
		realisateur: "Franck Gastambide",
		acteurs: "Franck Gastambide, Malik Bentalha, Bernard Farcy",
		synopsis: "ylvain Marot, super flic parisien et pilote d’exception, est muté contre son gré à la Police Municipale de Marseille. L’ex-commissaire Gibert, devenu Maire de la ville et au plus bas dans les sondages, va alors lui confier la mission de stopper le redoutable « Gang des Italiens », qui écume des bijouteries à l’aide de puissantes Ferrari. Mais pour y parvenir, Marot n’aura pas d’autre choix que de collaborer avec le petit-neveu du célèbre Daniel, Eddy Maklouf, le pire chauffeur VTC de Marseille, mais le seul à pouvoir récupérer le légendaire TAXI blanc.",
		trailer: "https://www.youtube.com/embed/6fmUv6tVWf8"
	},
	{
		id: 10,
		titre: "Tomb Raider",
		genre: "Aventure",
		annee: "2018",
		realisateur: "Roar Uthaug",
		acteurs: "Alicia Vikander, Dominic West, Walton Goggins",
		synopsis: "Lara Croft, 21 ans, n'a ni projet, ni ambition : fille d'un explorateur excentrique porté disparu depuis sept ans, cette jeune femme rebelle et indépendante refuse de reprendre l'empire de son père. Convaincue qu'il n'est pas mort, elle met le cap sur la destination où son père a été vu pour la dernière fois : la tombe légendaire d'une île mythique au large du Japon. Mais le voyage se révèle des plus périlleux et il lui faudra affronter d'innombrables ennemis et repousser ses propres limites pour devenir 'Tomb Raider'…",
		trailer: "https://www.youtube.com/embed/VufX7xSedWI"
	}
];