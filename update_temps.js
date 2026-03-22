const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'ExpandedColdFull.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const stateInjection = `  // Temperature system state
  const [isSystemEnabled, setIsSystemEnabled] = useState(false);
  const [randomTemps, setRandomTemps] = useState(Array(60).fill('00'));

  // Generate random temps between 10 and 80 when system is enabled
  useEffect(() => {
    let intervalId;
    if (isSystemEnabled) {
      setRandomTemps(Array.from({ length: 60 }, () => Math.floor(Math.random() * 70 + 10).toString()));
      intervalId = setInterval(() => {
        setRandomTemps(Array.from({ length: 60 }, () => Math.floor(Math.random() * 70 + 10).toString()));
      }, 3000);
    } else {
      setRandomTemps(Array(60).fill('00'));
    }
    return () => clearInterval(intervalId);
  }, [isSystemEnabled]);
`;

if (!content.includes('const [isSystemEnabled, setIsSystemEnabled] = useState')) {
  content = content.replace(
    /const \[activePump, setActivePump\] = useState\(null\);/,
    "const [activePump, setActivePump] = useState(null);\n" + stateInjection
  );
}

// Ensure Enable System toggle triggersstate
content = content.replace(
  /<span className="label1">Enable System<\/span>\s*<label className="switch">\s*<input type="checkbox" (?:defaultChecked \/|checked=\{isSystemEnabled\} onChange=\{\(e\) => setIsSystemEnabled\(e.target.checked\)\} \/|><\/input>)?>/,
  '<span className="label1">Enable System</span>\\n                      <label className="switch">\\n                        <input type="checkbox" checked={isSystemEnabled} onChange={(e) => setIsSystemEnabled(e.target.checked)} />'
);

let tempCount = 0;

// Replace <span class="value">00</span>
content = content.replace(/<span class="value">00<\/span>/g, function() {
  const index = tempCount++;
  return '<span class="value">{randomTemps[' + index + ']}</span>';
});

// Replace <span className="icon">00°</span>
content = content.replace(/<span className="icon">00°<\/span>/g, function() {
  const index = tempCount++;
  return '<span className="icon">{randomTemps[' + index + ']}°</span>';
});

// Replace <span className="iconar">00</span>
content = content.replace(/<span className="iconar">00<\/span>/g, function() {
  const index = tempCount++;
  return '<span className="iconar">{randomTemps[' + index + ']}</span>';
});

fs.writeFileSync(filePath, content);
console.log("Successfully injected state and replaced " + tempCount + " temperature readouts.");
