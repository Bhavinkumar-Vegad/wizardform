$(document).ready(function() {
  var a, b, c, d, e, f, i, kk, trlocation, srno, data0, data1, data2, data3, data4, data5, data6, data7, data8, currentRow;
  data0 = 0;
  var rows = [];

  function submitdata() {
    var i = $("#tableid").find("tr").last();
    var srno = i.find('td:first-child').text();
    console.log("loopstart");
    srno++;
    a = $("#fname").val();
    b = $("#lname").val();
    c = $('input[name=gender]:checked', '#resetvalue').val();
    var marge = "<tr><td>" + srno + "</td><td>" + a + "</td><td>" + b + "</td><td>" + c + "</td><td><input type='button' id='editbtn' value='Edit' style='cursor: pointer;'></td><td><input type='button' id='deletebtn' value='Delete' style='cursor: pointer;'></td></tr>";
    $("#tableid tbody").append(marge);
    $("#resetvalue").trigger("reset");
  };

  function Convert() {
      var table = document.getElementById("tableid");
      var header = [];
      for (var i = 0; i < table.rows[0].cells.length; i++) {
          header.push(table.rows[0].cells[i].innerHTML);
      }
      for (var i = 1; i < table.rows.length; i++) {
          var row = {};
          for (var j = 0; j < table.rows[i].cells.length; j++) {
              row[header[j]] = table.rows[i].cells[j].innerHTML;
          }
          rows.push(row);
      }
      console.log(rows);
  };

  function jsontotable() {
      var student = '';

      // ITERATING THROUGH OBJECTS
      $.each(rows, function(key, value) {

          //CONSTRUCTION OF ROWS HAVING
          // DATA FROM JSON OBJECT
          student += '<tr>';
          student += '<td>' +
              value.SrNo + '</td>';

          student += '<td>' +
              value.FirstName + '</td>';

          student += '<td>' +
              value.LastName + '</td>';

          student += '<td>' +
              value.Gender + '</td>';

          student += '<td>' +
              value.Edit + '</td>';

          student += '<td>' +
              value.Delete + '</td>';

          student += '</tr>';
      });

      //INSERTING ROWS INTO TABLE
      $('#table').append(student);
  };

  $(".tableclass").on('click', '#deletebtn', function() {
      trlocation = $(this).closest('tr').nextAll();
      data0 = trlocation.find("td:eq(0)").text();
      trlocation.each(function() {
          var noValue = $(this).find('td:first-child');
          var text = parseInt($(this).find('td:first-child').text()) - 1;
          noValue.text(text);
      });
      $(this).closest('tr').remove();
  });
  $(".tableclass").on('click', '#editbtn', function() {
      $('#edittime').removeClass('dn');
      $('#submitbtn').addClass("dn");
      $('#update,#cancel').css({
          display: 'inline-block',
          verticalAlign: 'middle'
      });
      $('#deletebtn').attr("disabled", true);
      var currentRow = $(this).closest("tr").addClass('select');
      console.log('currentRow', currentRow);
      var data1 = currentRow.find("td:eq(1)").text();
      $('#fname').val(data1);
      var data2 = currentRow.find("td:eq(2)").text();
      $('#lname').val(data2);
      var data3 = currentRow.find("td:eq(3)").text();
      if (data3 === 'male') {
          $("#male").prop("checked", true);
      } else {
          $("#female").prop("checked", true);
      }
  });
  $('#cancel').click(function() {
      $('#submitbtn').removeClass("dn");
      $('#update,#cancel').css({
          display: 'none'
      });
      $("#resetvalue").trigger("reset");
      $('#edittime').addClass('dn');
      $('#deletebtn').attr("disabled", false);
  });
  $('#update').on('click', function() {
      if ($('#fname').val() === '') {
          $('#validfname').removeClass('dn');
          $('#laststatus').html('*Check Step1');
          return false;
      } else {
          $('#validfname').addClass('dn');
          $('#laststatus').html('');
      }
      if ($('#lname').val() === '') {
          $('#validlname').removeClass('dn');
          $('#laststatus').html('*Check Step1');
          return false;
      } else {
          $('#validlname').addClass('dn');
          $('#laststatus').html('');
      }
      if ($("input[type=radio]").is(":checked")) {
          $('#validgender').addClass('dn');
          $('#laststatus').html('');
      } else {
          $('#validgender').removeClass('dn');
          $('#laststatus').html('*Check Step1');
          return false;
      }
      var kk = $('.select');
      console.log(kk);
      a = $("#fname").val();
      b = $("#lname").val();
      c = $('input[name=gender]:checked', '#resetvalue').val();
      kk.find('td:eq(1)').html(a);
      kk.find('td:eq(2)').html(b);
      kk.find('td:eq(3)').html(c);
      $('#submitbtn').removeClass("dn");
      $('#edittime').addClass('dn');
      $('#update,#cancel').css({
          display: 'none'
      });
      $("#resetvalue").trigger("reset");
      var kk = $(kk).removeClass('select');
      $('#deletebtn').attr("disabled", false);
  });
  $("#submitbtn").click(function() {
      submitdata();
  });
  $("#btnSubmit").click(function() {
      console.log("Submit all data");
      Convert();
      console.log("Data convert");
      jsontotable();
      console.log("jsontotable converted");
  });
});