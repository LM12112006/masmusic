/*
function enviar() {
    var nombre = document.getElementsByName("nombre")[0].value;
    var id = document.getElementsByName("id")[0].value;
    var nombre_acudiente = document.getElementsByName("nombre-acudiente")[0].value;
    var id_acudiente = document.getElementsByName("id-acudiente")[0].value;
    var direccion = document.getElementsByName("direccion")[0].value;
    var telefono = document.getElementsByName("telefono")[0].value;
    var correo = document.getElementsByName("mail")[0].value;
    var saber = document.getElementsByName("opcion-saberes")[0].value;
    var radios = document.getElementsByName("opcion-saberes");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
    saber = radios[i].value;
    break;
    }
    }
    var instrumento = document.getElementsByName("instrumento")[0].value;
    var nivel = document.getElementsByName("nivel-musica")[0].value;
    var form = document.querySelector('form');
  if (!form.checkValidity()) {
    alert('Por favor, complete todos los campos obligatorios.');
    return;
  }
    var cuerpo = "Nombre del beneficiario: " + nombre + "\n";
    cuerpo += "Identificacion: " + id + "\n";
    if(nombre_acudiente !="" && id_acudiente !=""){ 
    cuerpo += "Nombre del acudiente: " + nombre_acudiente + "\n";
    cuerpo += "Identificacion del acudiente: " + id_acudiente + "\n";
}
    cuerpo += "Direccion: " + direccion + "\n"; 
    cuerpo += "Telefono: " + telefono + "\n"; 
    cuerpo += "Correo: " + correo + "\n";
    cuerpo += "Tiene conocimientos musicales: " + saber + "\n";
    cuerpo += "Instrumento que quiere aprender: " + instrumento + "\n";
    cuerpo += "Nivel musical: " + nivel;
    window.location.href = "mailto:inscripcionesmasmusic25@gmail.com?subject=Registro%20nuevo%20beneficiario&body=" + encodeURIComponent(cuerpo);
    }
*/


function modal(){
  const botones = document.querySelectorAll('button[data-modal]');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const modalId = boton.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.style.display = "flex"
    });
  });
}

function cerrar(){
  const botones = document.querySelectorAll('button[data-modal]');
  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const modalId = boton.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.style.display = "none"
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const pedidoButton = document.querySelector('.order');
  const pedidoContainer = document.getElementById('pedido-container');
  const pedidoCloseButton = document.getElementById('pedido-close');

  pedidoButton.addEventListener('click', () => {
      pedidoContainer.style.display = 'block';
  });
  pedidoCloseButton.addEventListener('click', () => {
      pedidoContainer.style.display = 'none';
  });
});    

// Función para actualizar el total
function actualizarTotal() {
  const pedidosList = document.getElementById('pedidos');
  const liElements = pedidosList.children;
  let total = 0;
  for (let i = 0; i < liElements.length; i++) {
    const liElement = liElements[i];
    const textoLi = liElement.textContent;
    const precio = textoLi.split('-')[2].trim().replace('$', '');
    total += parseInt(precio);
  }
  const totalDiv = document.getElementById('total');
  totalDiv.textContent = `Total: $${total}`;
}

// Función para agregar un nuevo elemento al pedido
function añadir(event) {
  // Obtén el modal correspondiente al botón clicado
  const modalId = event.target.getAttribute('data-modal');
  const modal = document.getElementById(modalId);

  // Obtén el texto del producto
  const text = modal.querySelector('.text').textContent;

  // Verifica si el modal tiene un select con opciones de precio
  const select = modal.querySelector('select');
  let opcion;
  let price;
  if (select) {
    // Obtén la opción seleccionada en el select
    opcion = select.options[select.selectedIndex].value;

    // Obtén los precios de las opciones
    const precios = {
      "Talla S": "30000",
      "Talla M": "30000",
      "Talla L": "30000",
      "250g": "13000",
      "500g": "22000",
      "Normal":"20000"
    };

    // Obtén el precio de la opción seleccionada
    price = precios[opcion];
  } else {
    // Obtén el precio del elemento .price
    price = modal.querySelector('.price').textContent.replace('$', '');
    opcion = ''; // No hay opción seleccionada en este caso
  }

  // Crea un nuevo elemento li con los datos obtenidos
  const liElement = document.createElement('li');
  liElement.textContent = ` *${text} - ${opcion} - $${price}`;
  
   // Agrega un botón de eliminar al elemento li
   const eliminarButton = document.createElement('button');
   eliminarButton.textContent = 'Eliminar';
   eliminarButton.onclick = function() {
     // Elimina el elemento li cuando se hace clic en el botón
     this.parentNode.remove();
     
     // Actualiza el total después de eliminar
     actualizarTotal();
   };
   liElement.appendChild(eliminarButton);

   // Agrega estilo al texto del elemento li 
   liElement.style.color="#444";

   // Agrega el elemento li a la lista de pedidos 
   const pedidosList = document.getElementById('pedidos');
   pedidosList.appendChild(liElement);
   const alert = document.createElement('div');
  alert.textContent = "Añadido con exito";
  alert.style.position = 'fixed';
  alert.style.top = '10%';
  alert.style.left = '50%';
  alert.style.transform = 'translate(-50%, -50%)';
  alert.style.backgroundColor = '#f80';
  alert.style.color = '#fff';
  alert.style.padding = '20px';
  alert.style.borderRadius = '10px';
  document.body.appendChild(alert);
  
  setTimeout(() => {
    document.body.removeChild(alert);
  }, 2000); // Desaparece después de 3 segundos
   actualizarTotal();
}


// Agrega un evento click a todos los botones "Añadir al pedido"
const buttons=document.querySelectorAll('[onclick="añadir()"]');

buttons.forEach(boton => {
boton.addEventListener("click", function(event){
añadir(event)
})
})


const buttonForm=document.querySelectorAll('[onclick="form()"]');
buttonForm.forEach(boton => {
  boton.addEventListener('click', () => {
    const form = document.getElementById("form");
    const pedido = document.getElementById("pedido-container");
    form.style.display = "flex";
    pedido.style.display = "none";
  });
});

function final(event){
  var Numpedido = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  let pedidos = document.getElementById("pedidos");
  let lis = pedidos.getElementsByTagName("li");
  let texto = "";
  
  for (let i = 0; i < lis.length; i++) {
    let liContent = lis[i].cloneNode(true);
    let buttons = liContent.querySelectorAll("button");
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].remove();
    }
    texto += liContent.textContent.trim() + "\n";
  }
  var total = document.getElementById("total").textContent;
  var mensaje = "Detalle pedido \n" + texto +""+ total; 
    window.location.href = "mailto:inscripcionesmasmusic25@gmail.com?subject=Pedido%20#%20"+Numpedido+"&body=" + encodeURIComponent(mensaje);
    const alert = document.createElement('div');
    alert.innerHTML = `
    <div class="dialog-content">
      <p>El pedido #${Numpedido} fue registrado con éxito. Escribelo al <a style="color:#00f;" id="dialog-link" href="https://wa.me/573009490635?" target="_blank">WhatsApp</a> para efectuar el pago</p>
    </div>`;
alert.style.position = 'fixed';
alert.style.top = '10%';
alert.style.left = '50%';
alert.style.transform = 'translate(-50%, -50%)';
alert.style.backgroundColor = '#f80';
alert.style.color = '#fff';
alert.style.padding = '20px';
alert.style.borderRadius = '10px';
document.body.appendChild(alert);
}

// Agrega un evento de escucha al formulario
document.querySelector('#detalle-pedido').addEventListener('submit', final);

