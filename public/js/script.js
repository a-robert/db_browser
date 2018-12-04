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

  let _getData = url => {
    return $.ajax({
      type: 'GET',
      url: `/api/${url}`
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
      name: 'birthDate',
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

  let _displayData = (data) => {
    let headers = Object.keys(data[0]);

    let $theaderRow = $trowTemplate.clone();

    headers.forEach((header) => {
      $theaderRow.append($theadTemplate.clone().text(header));
    });

    $dataTable.html($('<thead></thead>').append($theaderRow));

    let $tbody = $('<tbody></tbody>');

    data.sort((a, b) => {
      return a.id > b.id;
    });

    data.forEach((obj) => {
      let $tRow = $trowTemplate.clone();

      headers.forEach((header) => {
        $tRow.append($tdataTemplate.clone().text(obj[header]));
      });

      $tbody.append($tRow);
    });

    $dataTable.append($tbody);
  };

  $('.actions').on('click', '.get-info', (e) => {
    _getData($(e.target).attr('data-api')).then(_displayData);
  }).on('click', '.add-info', (e) => {
    let api = $(e.target).attr('data-api');
    let requirements = _fields[api].filter((field) => field.route);
    let pReq = [];

    requirements.forEach((requirement) => pReq.push(_getData(requirement.route)));

    $.when.apply($, pReq).then(function() {
      let data = pReq.length === 1 ? [[...arguments][0]] : [...arguments].map((d) => d[0]);
      let reqI = 0;
      $addDataForm.html('');
      $addDataForm.attr('action', `/api/${api}`);

      _fields[api].forEach((fieled) => {
        if (fieled.route) {
          let $select = $selectTemplate.clone();

          data[reqI++].forEach((req) => {
            $select.append($optionTemplate.clone().text(req[fieled.value]).attr('value', req.id));
          });

          $addDataForm.append($formGroupTemplate.clone()
            .append(
              $labelTemplate.clone().text(fieled.name).attr('data-key', fieled.name)
                .append($select)
            ));
        } else {
          $addDataForm.append($formGroupTemplate.clone()
            .append(
              $labelTemplate.clone().text(fieled.name).attr('data-key', fieled.name)
                .append($inputTemplate.clone().attr('id', fieled.name))
            ));
        }
      });

      $('.modal').modal();
    });
  });

  $addDataForm.on('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let req = {};
    let $labels = $addDataForm.find('[data-key]');

    for (let i = 0; i < $labels.length; i++ ) {
      let $label = $($labels[i]);
      req[$label.attr('data-key')] = $label.find('input, select').val();
    }

    $.ajax({
      type: 'post',
      url: $addDataForm.attr('action'),
      data: req
    }).then(() => {
      $('.modal').modal('hide');
    }, (err) => {
      console.error(err);
      alert('Error happened');
    });
  });
});