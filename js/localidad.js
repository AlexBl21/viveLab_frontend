// Obtener datos de municipios y colegios
function obtenerDatosMunicipiosColegios() {
    // Obtener municipios
    axios.get('http://localhost:8080/api/municipios')
      .then(response => {
        const municipiosTable = document.getElementById('tabla-municipios');
        response.data.forEach(municipio => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${municipio.dane}</td>
            <td>${municipio.nombre}</td>
            <td>
              <button class="btn btn-edit" data-id="${municipio.id}"><i class="fas fa-pencil mr-2"></i> Editar</button>
              <button class="btn btn-delete" data-id="${municipio.id}"><i class="fas fa-trash mr-2"></i> Eliminar</button>
            </td>
          `;
          municipiosTable.querySelector('tbody').appendChild(row);
        });
  
        // Agregar event listeners a los botones de editar y eliminar municipios
        document.querySelectorAll('.btn-edit').forEach(button => {
          button.addEventListener('click', handleEditMunicipio);
        });
  
        document.querySelectorAll('.btn-delete').forEach(button => {
          button.addEventListener('click', handleDeleteMunicipio);
        });
      })
      .catch(error => console.error('Error al obtener los municipios:', error));
  
    // Obtener colegios
    axios.get('http://localhost:8080/api/colegios')
      .then(response => {
        const colegiosTable = document.getElementById('tabla-colegios');
        response.data.forEach(colegio => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${colegio.nombre}</td>
            <td>${colegio.municipio.nombre}</td>
            <td>
              <button class="btn btn-edit" data-id="${colegio.id}"><i class="fas fa-pencil mr-2"></i> Editar</button>
              <button class="btn btn-delete" data-id="${colegio.id}"><i class="fas fa-trash mr-2"></i> Eliminar</button>
            </td>
          `;
          colegiosTable.querySelector('tbody').appendChild(row);
        });
  
        // Agregar event listeners a los botones de editar y eliminar colegios
        document.querySelectorAll('.btn-edit').forEach(button => {
          button.addEventListener('click', handleEditColegio);
        });
  
        document.querySelectorAll('.btn-delete').forEach(button => {
          button.addEventListener('click', handleDeleteColegio);
        });
      })
      .catch(error => console.error('Error al obtener los colegios:', error));
  }
  
  // Función para manejar la eliminación de un municipio
  function handleDeleteMunicipio(event) {
    const municipioId = event.target.dataset.id;
    if (confirm('¿Estás seguro de que deseas eliminar este municipio?')) {
      axios.delete(`http://localhost:8080/api/municipios/${municipioId}`)
        .then(() => {
          alert('Municipio eliminado correctamente.');
          location.reload();
        })
        .catch(error => console.error('Error al eliminar el municipio:', error));
    }
  }
  
  // Función para manejar la edición de un municipio
  function handleEditMunicipio(event) {
    const municipioId = event.target.dataset.id;
    axios.get(`http://localhost:8080/api/municipios/${municipioId}`)
      .then(response => {
        const municipio = response.data;
        document.getElementById('municipio-nombre').value = municipio.nombre;
        document.getElementById('municipio-dane').value = municipio.dane;
        document.getElementById('municipio-id').value = municipio.id;
        document.getElementById('modal-municipio').style.display = 'flex';
      })
      .catch(error => console.error('Error al obtener el municipio:', error));
  }
  
  // Función para manejar la eliminación de un colegio
  function handleDeleteColegio(event) {
    const colegioId = event.target.dataset.id;
    if (confirm('¿Estás seguro de que deseas eliminar este colegio?')) {
      axios.delete(`http://localhost:8080/api/colegios/${colegioId}`)
        .then(() => {
          alert('Colegio eliminado correctamente.');
          location.reload();
        })
        .catch(error => console.error('Error al eliminar el colegio:', error));
    }
  }
  
  // Función para manejar la edición de un colegio
  function handleEditColegio(event) {
    const colegioId = event.target.dataset.id;
    axios.get(`http://localhost:8080/api/colegios/${colegioId}`)
      .then(response => {
        const colegio = response.data;
        document.getElementById('colegio-nombre').value = colegio.nombre;
        document.getElementById('colegio-id').value = colegio.id;
        document.getElementById('modal-colegio').style.display = 'flex';
      })
      .catch(error => console.error('Error al obtener el colegio:', error));
  }
  
  // Función para manejar la creación de un nuevo municipio
  function handleAddMunicipio() {
    const municipioNombre = document.getElementById('nombreMunicipio').value;
    const municipioDane = document.getElementById('codigoDaneMunicipio').value;
  
    axios.post('http://localhost:8080/api/municipios', { nombre: municipioNombre, dane: municipioDane })
      .then(response => {
        const municipio = response.data;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${municipio.dane}</td>
          <td>${municipio.nombre}</td>
          <td>
            <button class="btn btn-edit" data-id="${municipio.id}"><i class="fas fa-pencil mr-2"></i> Editar</button>
            <button class="btn btn-delete" data-id="${municipio.id}"><i class="fas fa-trash mr-2"></i> Eliminar</button>
          </td>
        `;
        document.getElementById('tabla-municipios').querySelector('tbody').appendChild(row);
        document.getElementById('modal-municipio').style.display = 'none';
      })
      .catch(error => console.error('Error al crear el municipio:', error));
  }
  
  // Función para manejar la creación de un nuevo colegio
  function handleAddColegio() {
    const colegioNombre = document.getElementById('nombreColegio').value;
    const municipioId = document.getElementById('municipioColegio').value;
  
    axios.post('http://localhost:8080/api/colegios', { nombre: colegioNombre, municipioId })
      .then(response => {
        const colegio = response.data;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${colegio.nombre}</td>
          <td>${colegio.municipio.nombre}</td>
          <td>
            <button class="btn btn-edit" data-id="${colegio.id}"><i class="fas fa-pencil mr-2"></i> Editar</button>
            <button class="btn btn-delete" data-id="${colegio.id}"><i class="fas fa-trash mr-2"></i> Eliminar</button>
          </td>
        `;
        document.getElementById('tabla-colegios').querySelector('tbody').appendChild(row);
        document.getElementById('modal-colegio').style.display = 'none';
      })
      .catch(error => console.error('Error al crear el colegio:', error));
  }
  
  // Cargar los datos iniciales de municipios y colegios
  obtenerDatosMunicipiosColegios();
  
  // Eventos para abrir los modales
  document.getElementById('btn-municipio').addEventListener('click', () => {
    document.getElementById('modal-municipio').style.display = 'flex';
  });
  
  document.getElementById('btn-colegio').addEventListener('click', () => {
    document.getElementById('modal-colegio').style.display = 'flex';
  });
  
  // Eventos para cerrar los modales
  document.getElementById('close-municipio').addEventListener('click', () => {
    document.getElementById('modal-municipio').style.display = 'none';
  });
  
  document.getElementById('close-colegio').addEventListener('click', () => {
    document.getElementById('modal-colegio').style.display = 'none';
  });
  
  window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('modal-municipio')) {
      document.getElementById('modal-municipio').style.display = 'none';
    }
    if (event.target === document.getElementById('modal-colegio')) {
      document.getElementById('modal-colegio').style.display = 'none';
    }
  });
  
  // Eventos para guardar cambios de municipio y colegio
  document.getElementById('save-municipio').addEventListener('click', () => {
    const municipioId = document.getElementById('municipio-id').value;
    const nombre = document.getElementById('municipio-nombre').value;
    const dane = document.getElementById('municipio-dane').value;
  
    axios.put(`http://localhost:8080/api/municipios/${municipioId}`, { nombre, dane })
      .then(() => {
        alert('Municipio actualizado correctamente.');
        location.reload();
      })
      .catch(error => console.error('Error al actualizar el municipio:', error));
  });
  
  document.getElementById('save-colegio').addEventListener('click', () => {
    const colegioId = document.getElementById('colegio-id').value;
    const nombre = document.getElementById('colegio-nombre').value;
  
    axios.put(`http://localhost:8080/api/colegios/${colegioId}`, { nombre })
      .then(() => {
        alert('Colegio actualizado correctamente.');
        location.reload();
      })
      .catch(error => console.error('Error al actualizar el colegio:', error));
  });