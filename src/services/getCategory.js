export function categorize(catID)
{
  category = ""
  if (catID == 110) {
    category = "Food/Drink";
  }
  else if (catID == 103) {
    category = "Music";
  }
  else if (catID == 104 || catID == 199 || catID == 116) {
    category = "Parties/Nightlife";
  }
  else if (catID == 108 || catID == 119) {
    category = "Games";
  }
  else if (catID == 101 || catID == 102 || catID == 114) {
    category = "Info-Session/Seminar";
  }
  else if (catID == 105) {
    category = "Theater/Dance";
  }
  else if (catID == 106 || catID == 117) {
    category = "Art/Film";
  }
  else if (catID == 107 || catID == 113) {
    category = "Sports/Recreation";
  }
  else {
    category = "Comedy";
  }
  return category;
}
