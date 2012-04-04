	// Constantes du jeu
	var myCanvas;
	var ctx;
	var marge=300;
	//on ajoute notre canvas à la scene
	myCanvas=document.createElement('canvas');
	//paramatres des briques
	var espaceBrique = 2;
	var tabBriques;
	var tabBriques = new Array();
	var briques=new Array();
	var briqueWidht;
	var briqueheight = 15;
	
	//variable pour conter les briques dans  dessindesBriques()
	var nb=0;
	//nos briques sont représentées ici, 0 pour invisible, et 1 pour visible
	var tabBriques = [ [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					   [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					   [ 0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
					   [ 0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0],
					   [ 0,0,0,1,0,1,1,0,1,0,0,0,0,1,0,1,1,0,1,0,0,0],
					   [ 0,0,0,1,0,1,1,0,1,0,0,0,0,1,0,1,1,0,1,0,0,0],
					   [ 0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0],
					   [ 0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0],
					   [ 0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
					   [ 0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
					   [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					   [ 0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
					   [ 0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
					   [ 0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],];
	var nbLignes = tabBriques.length;
	var nbBriquesParLigne = tabBriques[0].length;
	//vitesse de la balle (dx et dy en fait)
	var vitessex=-4;
	var vitessey=-4;
	//balle et ces parametres
	var balle;
	var RayonBalle=15;
	//parametres de la raquette
	var largeurRaquette=100;
	var hauteurRaquette=10;
	var raquette;
	var raquettex=400;
	var raquettey;
	//pour que le jeu commence automatique play = true sinon = false
	var play='true';
	var perdu=false;
	//au chargement de la page on fait ceci : 
	document.addEventListener('DOMContentLoaded',function()
	{
		//on ajoute le canvas
		document.body.appendChild(myCanvas);
		//taille du canvas
		myCanvas.width=800;
		myCanvas.height=600;
		myCanvas.style.marginLeft=marge+'px';
		ctx= myCanvas.getContext('2d');
		//position initiale de la raquette
		raquettey=myCanvas.height-hauteurRaquette;
		//calcul de la largeur des briques par rapport a la largeur totale
		briqueWidht = ((myCanvas.width-(espaceBrique*nbBriquesParLigne))/nbBriquesParLigne);
		dessindesBriques();
		//on creer notre balle
		balle=new Balle(RayonBalle,20,500);
		balle.dessiner(ctx);
		//on creer notre raquette
		raquette=new Raquette(raquettex,raquettey,largeurRaquette,hauteurRaquette,'blue');
		raquette.dessiner(ctx);
		myCanvas.style.border="1px red solid";
		//on ecoute le mouvement de la souris pour faire bouger la raquette
		document.addEventListener('mousemove', souris);
		//on ecoute le click pour faire pause
		document.addEventListener('click', stop);
		//on lance un fonction qui actualise le jeu en boucle
		loop();
	}, false);

//cette fonction permet de mettre en pause en changant play cf loop()
function stop()
{
	play=!play;
}

Raquette = function(x,y,w,h,c) {
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		this.c=c;
		this.hSUR2=this.h/2;
		this.wSUR2=this.w/2;
		

		this.positionner = function(x,y)
		{
			this.x=x;
			this.y=y;
		}

			this.dessiner = function(scene)
		{
			scene.beginPath();
			scene.rect(this.x,this.y,this.w,this.h);
			scene.fillStyle=this.c;
			scene.fill();
		}
	}


Brique = function(x,y,w,h,c) {
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		this.c=c;
		this.hSUR2=this.h/2;
		this.wSUR2=this.w/2;
		this.visible=true;
		this.positionner = function(x,y)
		{
			this.x=x;
			this.y=y;
		}

			this.dessiner = function(scene)
		{
			if (this.visible)
			{
			scene.beginPath();
			scene.rect(this.x,this.y,this.w,this.h);
			scene.fillStyle=this.c;
			scene.fill();
			scene.lineWidth=0.5;
			scene.strokeStyle="black";
			scene.stroke();
			}
		}

	}





Balle = function(r,x,y) {
		this.x=x;
		this.y=y;
		this.r=r;
		this.dx=vitessex;
		this.dy=vitessey;
		this.c="black";

		this.deplacer = function()
		{
			if ( (this.x-this.r)<=0 || (this.x+this.r)>=myCanvas.width) 
			{
				this.dx= (-this.dx);
			}
			else if ((this.y-this.r)<=0 ) {
				this.dy= (-this.dy);
			}
			else if ((this.y)>=myCanvas.height)
			{
				perdu=true;
			}
			this.x+=this.dx;
			this.y+=this.dy;
		}

			this.dessiner = function(scene)
		{
			scene.beginPath();
			scene.arc(this.x,this.y,this.r,0,2*Math.PI, false);
			scene.fillStyle=this.c;
			scene.fill();
			scene.lineWidth=0.5;
			scene.strokeStyle="black";
			scene.stroke();
		}

		 this.collision = function(rect)
		{
				collision=false;
				ytemp=rect.y;
				var AB;
				//on parcours tous les pixels du coté supérieur du rectangle 
				//et on regarde si la distance entre chacun et le centre de la balle
				// est inferieur au rayon
				for (var xtemp =rect.x; xtemp< (rect.x+rect.w) ;xtemp++) 
				{
					AB=Math.sqrt(((xtemp-this.x)*(xtemp-this.x))+((ytemp-this.y)*(ytemp-this.y)));
					if (AB<=this.r) 
					{
							this.dy= (-this.dy);
						collision=true;
						return collision;
					}
				}
					
				if (collision==false)
				{
					//on parcours tous les pixels du coté droit du rectangle 
					xtemp=rect.x+rect.w;
					
					for (var ytemp =rect.y; ytemp <(rect.y+rect.h) ; ytemp++) 
					{
						AB=Math.sqrt(((xtemp-this.x)*(xtemp-this.x))+((ytemp-this.y)*(ytemp-this.y)));
						if (AB<=this.r) 
						{
								
							this.dx= (-this.dx);
							collision=true;
							
						}
					}

					
					if (collision==false)
					{

						ytemp=rect.y+rect.h;
						//on parcours tous les pixels du coté inferieur du rectangle 
						for (var xtemp =(rect.x+rect.w); xtemp > rect.x ; xtemp--) 
						{
							AB=Math.sqrt(((xtemp-this.x)*(xtemp-this.x))+((ytemp-this.y)*(ytemp-this.y)));
							if (AB<=this.r) 
							{
								this.dy= (-this.dy);
								collision=true;
								
							}
						}
						
						if (collision==false)
						{
							//on parcours tous les pixels du coté gauche du rectangle 
							xtemp=rect.x;
			
							for (var ytemp =(rect.y+rect.h); ytemp > rect.y ; ytemp--) 
							{
								AB=Math.sqrt(((xtemp-this.x)*(xtemp-this.x))+((ytemp-this.y)*(ytemp-this.y)));
								if (AB<=this.r) 
								{
										this.dx= (-this.dx);
									collision=true;
									
								}
							}
							
						}

						
					}

					return collision;

				}

				
				
		}
	}


function loop()
{
	if (perdu)
	{
		ctx.clearRect(0,0,800,600);
		play=false;
		Afficher('Perdu');
	}
	if (play) {
		ctx.clearRect(0,0,800,600);
		balle.collision(raquette);
		collisionBriques();
		
		balle.dessiner(ctx);
		balle.deplacer();
		raquette.dessiner(ctx);
		raquette.positionner(raquettex,raquettey);
		actuBriques();
		
	}
	setTimeout(loop,2);
	
}

//pour actualiser la position de la raquette par rapport a celle de la souris
function souris(e)
{
	if (!((e.pageX-marge<=0) || (e.pageX+largeurRaquette-marge>=myCanvas.width)))
	{
				raquettex=e.pageX-marge;
	}
}

//on verifie qu'aucune brique n'est en collision avec la balle
//si c'est le cas on la rend invisible
//on ne verifie pas pour les briques invisibles
function collisionBriques()
{
	for (var i=0; i < briques.length; i++) 
		{
			if (briques[i].visible) 
			{
				if(balle.collision(briques[i]))
				{
					briques[i].visible=false;
				}
			}
			
		}
}

function Afficher(message)
{
	
    ctx.font = "70pt Arial";
    ctx.fillStyle = "red";
    ctx.fillText(message,  120,300);
}

function dessindesBriques()
{
	nb=0;
	for (var i=0; i < nbLignes; i++) 
		{
			for (var j=0; j < nbBriquesParLigne; j++) 
				{
					if (tabBriques[i][j]==1) 
					{
						//on dessine une brique visible
						color="rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")";
						briques[nb]=new Brique(j*(briqueWidht+espaceBrique),i*(briqueheight+espaceBrique),briqueWidht,briqueheight,color);
						briques[nb].dessiner(ctx);
					}
					else
					{
						//on dessine une brique invisible
						color="rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")";
						briques[nb]=(new Brique(j*(briqueWidht+espaceBrique),i*(briqueheight+espaceBrique),briqueWidht,briqueheight,color));
						briques[nb].visible=false;
						briques[nb].dessiner(ctx);
						
					}
					nb=nb+1;

				}
		}
	
					
}


function actuBriques()
{
	for (var i=0; i < briques.length; i++) 
		{
			briques[i].dessiner(ctx);
		}
}