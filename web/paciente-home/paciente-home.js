var psicologoId;
var consultaSelecionadaId;
var selectedRating;

var triggerTabList = document.querySelectorAll(".tab-button");
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", function (event) {
    event.preventDefault();
    tabTrigger.show();
  });
});

new DevExpress.ui.dxDataGrid(
  document.getElementById("consultas-tab-content-toshow"),
  {
    dataSource: new DevExpress.data.CustomStore({
      // key: "id_pessoa",
      load: () =>
        request(
          getConsultas + `?userId=${localStorage.getItem("user_id")}`,
          "GET"
        ).then((response) => response.data),
    }),
    columns: [
      { dataField: "id_pessoa", caption: "ID", width: 50, allowEditing: false },
      { dataField: "data", caption: "Data" },
      { dataField: "horario", caption: "Horario" },
      {
        type: "buttons",
        buttons: [
          {
            disabled(e) {
              return e.row.data.status == "Cancelada";
            },
            hint: "Avaliar consulta",
            icon: "favorites",
            onClick(e) {
              const btn = document.getElementById("avaliacaoModalTrigger");
              consultaSelecionadaId = e.row.data.id_consulta;
              btn.click();
            },
          },
          {
            hint: "Cancelar consulta",
            icon: "close",
            disabled(e) {
              return e.row.data.status == "Cancelada";
            },
            onClick(e) {
              consultaId = e.row.data.id_consulta;
              request(cancelarConsulta + `/${consultaId}`, "PUT");
            },
          },
        ],
      },
    ],
    showBorders: true,
    editing: {
      mode: "row",
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true,
    },
  }
);

new DevExpress.ui.dxDataGrid(
  document.getElementById("psicologos-tab-content-toshow"),
  {
    dataSource: new DevExpress.data.CustomStore({
      // key: "id_pessoa",
      load: () =>
        request(getPsicologo, "GET").then((response) => response.data),
    }),
    columns: [
      { dataField: "id_pessoa", caption: "ID", width: 50, allowEditing: false },
      { dataField: "nome", caption: "Name" },
      { dataField: "email", caption: "Email" },
      {
        type: "buttons",
        buttons: [
          {
            hint: "Marcar Consulta",
            icon: "clock",
            onClick(e) {
              const btn = document.getElementById("consultaModalTrigger");
              psicologoId = e.row.data.id_pessoa;
              btn.click();
            },
          },
        ],
      },
    ],
    showBorders: true,
    editing: {
      mode: "row",
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true,
    },
  }
);

flatpickr("#dataConsulta", {
  minDate: "today",
  disable: [
    function (date) {
      return date.getDay() === 0 || date.getDay() === 6;
    },
  ],
});

function AgendarConsulta() {
  const dataConsultaValor = document.getElementById("dataConsulta");
  const horaConsultaValor = document.getElementById("hora");

  obj = {
    pacienteId: localStorage.getItem("user_id"),
    psicologoId: psicologoId,
    data: dataConsultaValor.value,
    hora: horaConsultaValor.value,
  };
  request(agendarConsulta, "POST", obj).then((response) => response.data);
}


document.querySelectorAll('input[name="rating"]').forEach((input) => {
  input.addEventListener("change", function () {
    selectedRating = this.value;
  });
});

function ConfirmarAvaliacao() {
  const comentarioValor = document.getElementById("avaliacao-comentario");

  obj = {
    consultaId: consultaSelecionadaId,
    avaliacao: selectedRating,
    comentario: comentarioValor.value,
  };
  request(registrarAvaliacao, "POST", obj).then((response) => response.data);
}