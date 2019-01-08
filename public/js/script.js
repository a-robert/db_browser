jQuery(function($) {
  let $dataTable = $('.data-table');

  let $trowTemplate = $('<tr></tr>');
  let $theadTemplate = $('<th></th>');
  let $tdataTemplate = $('<td></td>');
  let $addDataForm = $('.add-data-form');
  let $formGroupTemplate = $('<div class="form-group"></div>');
  let $labelTemplate = $('<label class="label"></label>');
  let $inputTemplate = $('<input class="form-control" required>');
  let $selectTemplate = $('<select class="form-control"></select>');
  let $optionTemplate = $('<option></option>');
  let $confirmButton = $('#confirm');

  const API_URL = '/api';

  let _getData = url => {
    return $.ajax({
      method: 'GET',
      url: `${API_URL}/${url}`
    });
  };

  let _fields = {
    students: [{
      name: 'group',
      route: 'groups',
      value: 'name'
    }, {
      name: 'fullName',
      route: '',
      value: ''
    }, {
      name: 'birthdate',
      route: '',
      value: ''
    }, {
      name: 'address',
      route: '',
      value: ''
    }, {
      name: 'phoneNumber',
      route: '',
      value: ''
    }],
    groups: [{
      name: 'name',
      route: '',
      value: ''
    }],
    grades: [{
      name: 'studentId',
      route: 'students',
      value: 'fullName'
    }, {
      name: 'subjectId',
      route: 'subjects',
      value: 'name'
    }, {
      name: 'grade',
      route: '',
      value: ''
    }],
    subjects: [{
      name: 'name',
      route: '',
      value: ''
    }]
  };

  let _displayData = (data, api) => {
    let headers = Object.keys(data[0]);

    let $theaderRow = $trowTemplate.clone();

    headers.concat(Array(2).fill('')).forEach((header) => {
      $theaderRow.append($theadTemplate.clone().text(header));
    });

    $dataTable.html($('<thead></thead>').append($theaderRow));
    $dataTable.attr('data-action', api);

    let $tbody = $('<tbody></tbody>');

    data.sort((a, b) => a.id - b.id);

    data.forEach((obj) => {
      let $tRow = $trowTemplate.clone();
      $tRow.attr('data-id', obj.id);

      headers.forEach((header) => {
        $tRow.append($tdataTemplate.clone().text(obj[header]));
      });

      if (api !== 'summary') {
        $tRow
          .append($tdataTemplate.clone().html('<i class="far fa-edit edit" title="Փոփոխել"></i>'))
          .append($tdataTemplate.clone().html('<i class="far fa-trash-alt delete" title="Ջնջել"></i>'));
      }

      $tbody.append($tRow);
    });

    $dataTable.append($tbody);
  };

  function _prepareModal(api, values = {}) {
    let requirements = _fields[api].filter((field) => field.route);
    let pReq = [];
    $confirmButton.text(arguments.length === 1 ? 'Ավելացնել' : 'Փոփոխել');

    requirements.forEach((requirement) => pReq.push(_getData(requirement.route)));

    $.when(...pReq).then(function(...args) {
      let data = pReq.length === 1 ? args.slice(0, 1) : args.map((d) => d[0]);
      let reqI = 0;
      $addDataForm.html('');
      $addDataForm.attr('action', `${API_URL}/${api}` + (values.id ? `/${values.id}` : ''));

      _fields[api].forEach((field) => {
        if (field.route) {
          let $select = $selectTemplate.clone();

          data[reqI++].forEach((req) => {
            $select.append($optionTemplate.clone().text(req[field.value]).attr('value', req.id));
          });

          $addDataForm.append($formGroupTemplate.clone()
            .append(
              $labelTemplate.clone().text(field.name).attr('data-key', field.name)
                .append($select.val(values[field.name] || ''))
            ));
        } else {
          $addDataForm.append($formGroupTemplate.clone()
            .append(
              $labelTemplate.clone().text(field.name).attr('data-key', field.name)
                .append($inputTemplate.clone().attr('id', field.name).val(
                  ((field.name === 'birthdate' && values[field.name]) ? values[field.name].split('T')[0] : values[field.name]) || ''
                ))
            ));
        }
      });

      $('.modal').modal();
    });
  }

  $('.actions').on('click', '.get-info', e => {
    _getData(e.target.dataset.api).then(res => _displayData(res, e.target.dataset.api));
  }).on('click', '.add-info', e => _prepareModal(e.target.dataset.api));

  $addDataForm.on('submit', e => {
    let req = {};
    let $labels = $addDataForm.find('[data-key]');
    const isUpdate = $confirmButton.text() === 'Save';

    for (let i = 0; i < $labels.length; i++) {
      let $label = $($labels[i]);
      req[$label.attr('data-key')] = $label.find('input, select').val();
    }

    $.ajax({
      method: isUpdate ? 'PUT' : 'POST',
      url: $addDataForm.attr('action'),
      data: req
    }).then(() => {
      $('.modal').modal('hide');
      const api = $addDataForm.attr('action').split('/')[2];
      _getData(api).then(res => _displayData(res, api));
    }, err => {
      console.error(err);
      alert('Error happened');
    });

    return false;
  });

  $dataTable.on('click', '.edit', async function() {
    const id = this.closest('tr').dataset.id;

    if (!id) {
      return alert('Edit is not supported');
    }

    const action = this.closest('table').dataset.action;

    const [data] = await fetch(`${API_URL}/${action}/${id}`).then(res => res.json());

    if (!data) {
      return;
    }

    _prepareModal(action, data);
  }).on('click', '.delete', async function() {
    const id = this.closest('tr').dataset.id;
    const action = this.closest('table').dataset.action;

    if (!id) {
      return alert('Delete is not supported');
    }

    if (!confirm('Համոզված ե՞ք, որ ուզում եք ջնջել տվյալը։')) {
      return;
    }

    try {
      await fetch(`${API_URL}/${action}/${id}`, {
        method: 'DELETE'
      }).then(res => res.ok ? res.json() : Promise.reject());
      this.closest('tr').remove();
    } catch (e) {
      alert('Error happened');
    }
  });
});