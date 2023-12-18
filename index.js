const data = [
    { "genre": "Rock", "value": 316 , "image": "genre-images/rocktopster.png"},
    { "genre": "Funk / Soul", "value": 50, "image": "genre-images/funksoultopster.png" },
    { "genre": "Electronic", "value": 44, "image": "genre-images/electronictopster.png"  },
    { "genre": "Hip Hop", "value": 34, "image": "genre-images/hiphoptopster.png" },
    { "genre": "Jazz", "value": 19, "image": "genre-images/jazztopster.png"},
    { "genre": "Folk", "value": 13, "image": "genre-images/folktopster.png" },
    { "genre": "Blues", "value": 9, "image": "genre-images/bluestopster.png" },
    { "genre": "Reggae", "value": 6, "image": "genre-images/reggaetopster.png" },
    { "genre": "Pop", "value": 2, "image": "genre-images/poptopster.png" },
    { "genre": "Classical", "value": 1, "image": "genre-images/classicaltopster.png" },
    { "genre": "Latin", "value": 1, "image": "genre-images/latintopster.png" },
  ];

  // Set up the SVG container
  const svgWidth = 750;
  const svgHeight = 800;
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Create scales
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.genre))
    .range([margin.left, svgWidth - margin.right])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([svgHeight - margin.bottom, margin.top]);
  
  // Gradient
  const gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "barGradient")
    .attr("gradientTransform", "rotate(90)");

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#EC5A00");

  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#553c9a");


  // Create x axis
  svg.append("g")
    .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "10px")
    .style("fill", "lightgrey");

  // Create y axis
  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale))
    .style("font-size", "14px")
    .classed(("y-axis-text", true));

  // Create bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.genre))
    .attr("y", d => yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", d => svgHeight - margin.bottom - yScale(d.value))
    .attr("fill", "url(#barGradient")
    .on("click", d => showImage(d.image));

  // Function to show image
  function showImage(imagePath) {
    // Remove any existing images
    d3.select("#image-container").selectAll("img").remove();

    // Create and append the image with a specified width
    const imageElement = document.createElement("img");
    imageElement.src = imagePath;
    imageElement.alt = "Genre Image";
    imageElement.height = 800;
    imageElement.width = 800; // Adjust the width as needed
    document.getElementById("image-container").appendChild(imageElement);
  } 
