export function categorize(catID)
{
  var category = "Comedy"
  if (catID == "110") {
    category = "Food/Drink";
  }
  if (catID == '103') {
    category = "Music";
  }
  if (catID == '104' || catID == '199' || catID == '116') {
    category = "Parties/Nightlife";
  }
  if (catID == '108' || catID == '119') {
    category = "Games";
  }
  if (catID == '101' || catID == '102' || catID == '114') {
    category = "Info-Session/Seminar";
  }
  if (catID == '105') {
    category = "Theater/Dance";
  }
  if (catID == '106' || catID == '117') {
    category = "Art/Film";
  }
  if (catID == '107' || catID == '113') {
    category = "Sports/Recreation";
  }


  return category;
}
