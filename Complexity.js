function Complexity()
{
	var input = document.getElementById("complexity");//sets the complexity text area to a variable
	var errStr = document.getElementById("error"); //sets text to the right of the complexity to a variable
	input.oninput = function()//function to make sure the value of the complexity is a valid input
	{
		value = input.value;
		if (value.length < 1)
		{
			input.value = "0";
		}
		else
		{
			for (var i = 0; i < value.length; i++)
			{
				var ascii = value.charCodeAt(i)
				if(!((ascii > 47 && ascii < 58) || (ascii > 64 && ascii < 71) || (ascii > 96 && ascii < 103)))
				{
					errStr.innerHTML = "There is an error in the Complexity";
					return;
				}
			}
		}
		errStr.innerHTML = "";
	};
}