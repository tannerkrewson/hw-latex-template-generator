$("#generate").click(function () {
  var name = $("#name").val();
  var assignment = $("#assignment").val();
	var problemsIn = $("#problems").val();

  var problems = problemsIn.split(",");
  $.map(problems, $.trim); //trim whitespace on all strings in array

	var output = "\\documentclass[12pt]{article}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\usepackage[letterpaper,top=1in,bottom=1in,left=1in,right=1in]{geometry}\n\n\\title{\\vspace{-4ex}";
  output += assignment;
  output += " - CS 191}\n\\author{"
  output += name;
  output += "}\n\\date{\\vspace{-3ex}}\n\n\\begin{document}\n\\maketitle\n\n\\begin{itemize}\n";

  output += splitOutLetteredProblems(problems);

  output += "\\end{itemize}\n\\end{document}";

  $("#output").val(output);
});

function splitOutLetteredProblems (problems) {
	var newProblems = [];

  problems.forEach(function (problem) {
  	var tProblem = problem.trim();
  	var problemWithJustNumbers = tProblem.replace(/\D/g,'');

    if (tProblem !== problemWithJustNumbers) {
    	var problemWithJustLetters = tProblem.replace(/[^A-Za-z]/g, "").trim();
      var letters = problemWithJustLetters.split('');
      letters.forEach(function (letter) {
      	newProblems.push(problemWithJustNumbers + letter);
      });
    } else {
    	newProblems.push(tProblem);
    }
  });
  return getLatexList(newProblems);
}

function getLatexList (problemNumbers) {
	var output = "";
  problemNumbers.forEach(function(problemNumber) {
  	output += getLatexListItem(problemNumber) + "\n\n";
  });
  return output;
}

function getLatexListItem (number) {
	return "\t\\item [" + number + ".] ";
}

$("#copyOutput").click(function () {
  $("#output").select();
  document.execCommand('copy');

  //clear the selection
  if ( document.selection ) {
      document.selection.empty();
  } else if ( window.getSelection ) {
      window.getSelection().removeAllRanges();
  }
});
