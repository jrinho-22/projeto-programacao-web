var psicologoId;
var consultaSelecionadaId;
var selectedRating;

const especialidades = [
  { id: 1, nome: "Psicologia Clínica" },
  { id: 2, nome: "Psicologia Escolar" },
  { id: 3, nome: "Psicanálise" },
  { id: 4, nome: "Neuropsicologia" },
  { id: 5, nome: "Psicologia do Esporte" },
];

const statusConsulta = [
  { id: 1, nome: "Cancelada" },
  { id: 2, nome: "Agendada" },
];

var triggerTabList = document.querySelectorAll(".tab-button");
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", function (event) {
    event.preventDefault();
    tabTrigger.show();
  });
});

const grid = new DevExpress.ui.dxDataGrid(
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
    onRowPrepared: function (e) {
      if (e.rowType === "data") {
        const status = e.data.status_consulta_id;

        if (status === 1) {
          e.rowElement.addClass("row-cancelada");
        } else if (status === 2) {
          e.rowElement.addClass("row-confirmada");
        }
      }
    },
    paging: {
      enabled: true,
      pageSize: 6,
    },
    columns: [
      {
        dataField: "id_consulta",
        caption: "id",
        allowEditing: false,
        visible: false,
      },
      {
        dataField: "especialidade_id",
        caption: "Especialidade",
        lookup: {
          dataSource: especialidades,
          valueExpr: "id",
          displayExpr: "nome",
        },
      },
      {
        dataField: "data",
        caption: "Data",
        dataType: "date",
        sortOrder: "asc",
      },
      { dataField: "horario", caption: "Horario" },
      {
        dataField: "status_consulta_id",
        caption: "Status",
        lookup: {
          dataSource: statusConsulta,
          valueExpr: "id",
          displayExpr: "nome",
        },
      },
      {
        caption: "Ações",
        type: "buttons",
        buttons: [
          {
            disabled(e) {
              return e.row.data.status_consulta_id == 1;
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
              return e.row.data.status_consulta_id == 1;
            },
            onClick(e) {
              consultaId = e.row.data.id_consulta;
              request(cancelarConsulta + `/${consultaId}`, "PUT").then(
                (response) => {
                  if (response.status == "success") {
                    alertSuccess("Consulta cancelada com sucesso");
                    setTimeout(() => grid.refresh(), 1000);
                  } else {
                    alertErro(response.errorMessage);
                  }
                }
              );
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
      {
        dataField: "id_pessoa",
        caption: "ID",
        width: 50,
        allowEditing: false,
        visible: false,
      },
      { dataField: "Psicologo", caption: "Nome" },
      { dataField: "email", caption: "Email" },
      { dataField: "crp", caption: "CRP" },
      {
        dataField: "especialidade_id",
        caption: "Especialidade",
        lookup: {
          dataSource: especialidades,
          valueExpr: "id",
          displayExpr: "nome",
        },
      },
      { dataField: "valor_hora", caption: "Valor Hora" },
      {
        caption: "Ações",
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
  request(agendarConsulta, "POST", obj).then((response) => {
    if (response.status == "success") {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("exampleModal")
      );
      modal.hide();
      alertSuccess("Consulta Agendada com sucesso");
      document.getElementById("psicologo-tab").click();
      setTimeout(() => grid.refresh(), 1000);
    } else {
      alertErro(response.errorMessage);
    }
  });
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
  request(registrarAvaliacao, "POST", obj).then((response) => {
    if (response.status == "success") {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("avaliacaoModal")
      );
      modal.hide();
      alertSuccess("Avaliação enviada com sucesso");
    } else {
      alertErro(response.errorMessage);
    }
  });
}