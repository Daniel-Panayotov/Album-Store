# Album-Store

The website has 13 pages and 17 components

-------Endpoints-------

----Core Module----

/home - home component
/unauthorised - unauthorised component
/error - Error component
/** - Not found component

----Users Module----

/users/login - login component
/users/register - register component
/users/profile - profile component
/users/profile/edit - edit-profile component

----Albums Module----

/albums/new - new-album component
/albums/:id/details - album-details component
/albums/:id/edit - edit-album component

----Comments Module----

/comments/:id/new - new-comment component
/comments/:id/edit/:index - edit-comment component

-------Architecture-------
                                   main.ts
                                      |
                                app.module.ts
							    |           |
   user/comment/album <- services	        components
						    |               |    |    |
							|	   	 non-lazy	 |	 lazy modules -> Users/Albums/Comments
		    firebase  <- backend  	       |     |
				|				    	  Core   |
				|				  		         |
	   auth/firestore/hosting	  				 |		             
                                            -------------  ->  -----------  ->  -----------
						                   |  component  |    |  service  |    |  backend  |
						                    -------------  <-  -----------  <-  -----------
										     ^ binding |
										     |         |
											------------
										   |  template  |
											------------
											
												