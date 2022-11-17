const json = `{"ItemList": {
    "user-post": {
      "list": [
        "7166170428367473947",
        "7165453208557505819",
        "7165073389202197786"
    ]
}
}}`;

const obj = JSON.parse(json);

console.log(obj.ItemList["user-post"].list);

let s =
  '{"title":"Transparency","href":"https:\\u002F\\u002Fwww.tiktok.com\\u002Ftransparency?lang=en"}';
s = s.split('\\"').join();
console.log(s);
