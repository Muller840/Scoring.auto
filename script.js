let clientes = [];

document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const ciCliente = document.getElementById('ciCliente').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const salario = parseFloat(document.getElementById('salario').value);
    const estadoCivil = document.getElementById('estadoCivil').value;
    const nombreConyuge = document.getElementById('nombreConyuge').value || '';
    const salarioConyuge = parseFloat(document.getElementById('salarioConyuge').value) || 0;

    const cliente = {
        ciCliente,
        nombre,
        apellido,
        email,
        telefono,
        salario,
        estadoCivil,
        nombreConyuge,
        salarioConyuge,
        estatus: 'pendiente'
    };

    clientes.push(cliente);
    alert('Cliente registrado con éxito');
    actualizarListaClientes();
    document.getElementById('clienteForm').reset();
    document.getElementById('conyugeFields').style.display = 'none';

    // Cambiar a la pestaña "Lista de Clientes"
    const listaClientesTab = new bootstrap.Tab(document.getElementById('lista-clientes-tab'));
    listaClientesTab.show();
});

function actualizarListaClientes() {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos datos

    clientes.forEach(cliente => {
        const clienteElemento = document.createElement('div');
        clienteElemento.classList.add('card', 'mb-3');
        clienteElemento.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${cliente.nombre} ${cliente.apellido}</h5>
                <p class="card-text"><strong>Ci del Cliente:</strong> ${cliente.ciCliente}</p>
                <p class="card-text"><strong>Email:</strong> ${cliente.email}</p>
                <p class="card-text"><strong>Teléfono:</strong> ${cliente.telefono}</p>
                <p class="card-text"><strong>Salario:</strong> Gs ${cliente.salario.toLocaleString()}</p>
                <p class="card-text"><strong>Estado Civil:</strong> ${cliente.estadoCivil}</p>
                ${cliente.estadoCivil === 'casado' ? `
                <p class="card-text"><strong>Nombre del Cónyuge:</strong> ${cliente.nombreConyuge}</p>
                <p class="card-text"><strong>Salario del Cónyuge:</strong> Gs ${cliente.salarioConyuge.toLocaleString()}</p>
                ` : ''}
            </div>
        `;
        listaClientes.appendChild(clienteElemento);
    });
}

function toggleConyugeFields() {
    const estadoCivil = document.getElementById('estadoCivil').value;
    const conyugeFields = document.getElementById('conyugeFields');
    if (estadoCivil === 'casado') {
        conyugeFields.style.display = 'block';
    } else {
        conyugeFields.style.display = 'none';
        document.getElementById('nombreConyuge').value = '';
        document.getElementById('salarioConyuge').value = '';
    }
}

function calcularPrestamo() {
    const monto = parseFloat(document.getElementById('montoPrestamo').value);
    const plazo = parseInt(document.getElementById('plazoPrestamo').value);
    const tasaAnual = 0.109; // 10.9% tasa de interés anual
    const tasaMensual = tasaAnual / 12; // tasa mensual
    const cuota = (monto * tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);

    const resultadoPrestamo = `Cuota mensual para préstamo de Gs ${monto.toLocaleString()} a ${plazo} meses: Gs ${Math.round(cuota).toLocaleString()}`;
    document.getElementById('resultadoPrestamo').textContent = resultadoPrestamo;
}

function analizarCliente() {
    const ciAnalizar = document.getElementById('ciAnalizar').value;
    const cliente = clientes.find(c => c.ciCliente === ciAnalizar);

    if (cliente) {
        const resultadoAnalisis = document.getElementById('resultadoAnalisis');
        resultadoAnalisis.innerHTML = `
            <h5 class="mt-4">Datos del Cliente</h5>
            <p><strong>Nombre:</strong> ${cliente.nombre}</p>
            <p><strong>Apellido:</strong> ${cliente.apellido}</p>
            <p><strong>Ci del Cliente:</strong> ${cliente.ciCliente}</p>
            <p><strong>Email:</strong> ${cliente.email}</p>
            <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
            <p><strong>Salario:</strong> Gs ${cliente.salario.toLocaleString()}</p>
            <p><strong>Estado Civil:</strong> ${cliente.estadoCivil}</p>
            ${cliente.estadoCivil === 'casado' ? `
            <p><strong>Nombre del Cónyuge:</strong> ${cliente.nombreConyuge}</p>
            <p><strong>Salario del Cónyuge:</strong> Gs ${cliente.salarioConyuge.toLocaleString()}</p>
            ` : ''}
        `;
    } else {
        alert('Cliente no encontrado');
    }
}
