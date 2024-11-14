class Viaje {
  constructor() {
    navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
  }

  getPosicion(position) {
    this.longitud         = position.coords.longitude; 
    this.latitud          = position.coords.latitude;  
    this.precision        = position.coords.accuracy;
    this.altitud          = position.coords.altitude;
    this.precisionAltitud = position.coords.altitudeAccuracy;
    this.rumbo            = position.coords.heading;
    this.velocidad        = position.coords.speed;   
  }

  verErrores(error){
    switch(error.code) {
    case error.PERMISSION_DENIED:
        this.mensaje = "El usuario no permite la petición de geolocalización"
        break;
    case error.POSITION_UNAVAILABLE:
        this.mensaje = "Información de geolocalización no disponible"
        break;
    case error.TIMEOUT:
        this.mensaje = "La petición de geolocalización ha caducado"
        break;
    case error.UNKNOWN_ERROR:
        this.mensaje = "Se ha producido un error desconocido"
        break;
    }
  }

  getMapaEstaticoGoogle(){
    var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
    //URL: obligatoriamente https
    var url = "https://maps.googleapis.com/maps/api/staticmap?";
    //Parámetros
    // centro del mapa (obligatorio si no hay marcadores)
    var centro = "center=" + this.latitud + "," + this.longitud;
    //zoom (obligatorio si no hay marcadores)
    //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
    var zoom ="&zoom=15";
    //Tamaño del mapa en pixeles (obligatorio)
    var tamaño= "&size=800x600";
    //Escala (opcional)
    //Formato (opcional): PNG,JPEG,GIF
    //Tipo de mapa (opcional)
    //Idioma (opcional)
    //region (opcional)
    //marcadores (opcional)
    var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
    //rutas. path (opcional)
    //visible (optional)
    //style (opcional)
    var sensor = "&sensor=false"; 
    
    this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
    var mapa=$("<img>");
    mapa.attr("src", this.imagenMapa);
    mapa.attr("alt", "Mapa de la ubicación del usuario");
    $('section').append(mapa);
  }
}