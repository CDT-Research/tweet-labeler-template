import {useState, useEffect} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import {stereotypelist, abuseTypes, idtypes} from '../assets/formcontent'
const ScreenOne = ({candidateName, isRelated, stance, narrative, setIsRelated, setStance, setNarrative, handleSubmit, nextScreen}) => {
  const [markedRelated, setMarkedRelated] = useState(null)
  const [markedStance, setMarkedStance] = useState(null)
  const [markedNarrative, setMarkedNarrative] = useState(null)
  const [loading, setLoading] = useState(false)
  const loadSubmit = () => {
    setLoading(true)
    handleSubmit()
  }
  const handleRelatedChange = (e) => {
    setIsRelated(e.target.value)
    if (e.target.value != "yes"){
      setNarrative(null)
      setStance(null)
    }
  }
  const handleStanceChange = (e) => {
    setStance(e.target.value)
  }
  const handleNarrative = (e) => {
    setNarrative(e.target.value)
  }
  return(
    <>
    <Typography align="right">Page 1/3</Typography>
    <FormControl sx={{mb:3}}>
      <FormLabel id="is-related-group-label">Is this tweet directly related to {'@'+candidateName}?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="is-related-group-label"
        name="is-related-group"
        value={isRelated}
        onChange={handleRelatedChange}
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
    <FormControl disabled={isRelated != 'true'} sx={{mb:3}}>
    <FormLabel id="stance-label">What is the stance?</FormLabel>
    <RadioGroup
      row
      aria-labelledby="stance-label"
      name="stance-group"
      value={stance}
      onChange={handleStanceChange}
    >
      <FormControlLabel value="positive" control={<Radio />} label="Positive" />
      <FormControlLabel value="negative" control={<Radio />} label="Negative" />
      <FormControlLabel value="neutral" control={<Radio />} label="Neutral" />
    </RadioGroup>
  </FormControl>
  <FormControl disabled={isRelated != 'true'} sx={{mb:3}}>
  <FormLabel id="narrative-label">What is the narrative?</FormLabel>
  <RadioGroup
    row
    aria-labelledby="narrative-label"
    name="narrative-group"
    value={narrative}
    onChange={handleNarrative}
  >
  <Grid container spacing={1}>
    <Grid item xs={4} align="left">
      <FormControlLabel value="ideology" control={<Radio />} label="Ideology" />
    </Grid>
    <Grid item xs={4} align="left">
      <FormControlLabel value="policy" control={<Radio />} label="Policy" />
    </Grid>
    <Grid item xs={4} align="left">
      <FormControlLabel value="identity" control={<Radio />} label="Identity" />
    </Grid>
    <Grid item xs={12}>
      <hr/>
    </Grid>
    <Grid item xs={4} align="left">
      <FormControlLabel value="character" control={<Radio />} label="Character" />
    </Grid>
    <Grid item xs={4} align="left">
      <FormControlLabel value="electibility" control={<Radio />} label="Electibility" />
    </Grid>
    </Grid>
  </RadioGroup>
</FormControl>
{(isRelated == null || isRelated == "true") && <Button onClick={nextScreen} variant="outlined" disabled={stance == null || narrative == null} value={narrative == "identity" ? "screen2" : "screen3"}>Next</Button>}
{isRelated == "false" && !loading && <Button onClick={loadSubmit} variant="contained">Submit Tweet</Button>}
{isRelated == "false" && loading && <Button disabled variant="contained">Loading...</Button>}
    </>
  )
}
const ScreenTwo = ({handleBack, idType, handleIdChange, stereotype, handleStereotype, nextScreen}) => {
  return(
    <>
    <Typography align="right">Page 2/3</Typography>
    <FormControl sx={{mb:3}}>
      <FormLabel id="identity-label">Identity</FormLabel>
      <FormGroup >
        <Grid container spacing={1}>
        {idType.map(idname => (
          <Grid item xs={4} align="left" key={idname.name}>
          <FormControlLabel
            key={idname.name}
            control={
              <Checkbox checked={idname.isChecked} name={idname.name} onChange={handleIdChange} />
            }
            label={idname.label} />
          </Grid>
        ))}
        </Grid>
      </FormGroup>
    </FormControl>
    <FormControl sx={{mb:3}}>
      <FormLabel id="stereotype-label">Stereotype</FormLabel>
      <FormGroup>
        <Grid container spacing={1}>
        {stereotype.map((ster, i) => (
          <Grid item xs={4} align="left" key={ster.name}>
          <FormControlLabel
            key={ster.name}
            control={
              <Checkbox checked={ster.isChecked} name={ster.name} onChange={handleStereotype} disabled={!ster.isEnabled}/>
            }
            label={ster.label} />
          </Grid>
        ))}
        </Grid>
      </FormGroup>
    </FormControl>
    <Box sx={{display:'flex'}}>
      <Button sx={{margin:3}} onClick={handleBack} variant="outlined" color="error" value="screen2">Back</Button>
      <Button sx={{margin:3}} onClick={nextScreen} value="screen3" variant="outlined" disabled={!idType.find(x => x.isChecked)}>Next</Button>
    </Box>
    </>
  )
}
const ScreenThree = ({handleBack, setAbuse, abuse, abusetype, handleAbuse, setDisinfo, disinfo, setExternal, external, handleSubmit}) => {
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true)
    handleSubmit()
  }
  return(
    <>
    <Typography align="right">Page 3/3</Typography>
    <Box sx={{display:'flex', flexDirection:'column'}}>
      <Box sx={{display:'flex', flexDirection:'column'}}>
        <FormControl sx={{mb:3}}>
          <FormLabel id="is-abuse-group-label">Abuse?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="is-abuse-group-label"
            name="is-abuse-group"
            value={abuse}
            onChange={(e) => setAbuse(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <FormControl disabled={abuse==null||abuse=='no'} sx={{mb:3}}>
          <FormLabel>What kind of abuse?</FormLabel>
          <FormGroup>
            <Grid container spacing={1}>
          {abusetype.map((ab, i) => (
            <Grid item align="left" xs={4} key={ab.name}>
            <FormControlLabel
              key={ab.name}
              control={
                <Checkbox checked={ab.isChecked} name={ab.name} onChange={handleAbuse} />
              }
              label={ab.label} />
            </Grid>
          ))}
          </Grid>
          </FormGroup>
        </FormControl>
      </Box>
      <Box sx={{display:'flex', flexDirection:'column'}}>
        <FormControl sx={{mb:3}}>
          <FormLabel id="is-disinfo-group-label">Disinfo?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="is-disinfo-group-label"
            name="is-disinfo-group"
            value={disinfo}
            onChange={(e) => setDisinfo(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="unverifiable" control={<Radio />} label="unverifiable" />
          </RadioGroup>
        </FormControl>
        <TextField label="External Source" value={external} onChange={(e) => setExternal(e.target.value)} disabled={disinfo=="no" || disinfo==null} sx={{mb:3}} />
      </Box>
    </Box>
    <Box sx={{display:'flex'}}>
    <Button sx={{margin:3}} onClick={handleBack} variant="outlined" color="error" value="screen3" disabled={loading}>Back</Button>
    {!loading && <Button sx={{margin:3}} onClick={handleClick} variant="contained" disabled={(disinfo == null || abuse == null || ((abuse == "yes" || abuse == "borderline") && !abusetype.find(x => x.isChecked)))}>Submit Tweet</Button>}
    {loading && <Button sx={{margin:3}} variant="contained" disabled>Loading...</Button>}
    </Box>
    </>
  )
}
const filterStereotypes = (stereotypeList, idList) => {
  return stereotypeList.map(s => ({...s, isEnabled: includeStereotype(s,idList)}))
}
const includeStereotype = (stereotype, idList) => {
  let toInclude = false
  for (let i = 0; i < stereotype.reqlist.length; i++){
    if (idList.find(idtype => idtype.name == stereotype.reqlist[i] && idtype.isChecked)){
      toInclude = true
      break
    }
  }
  return toInclude
}
const FormArea = ({getNext, currentTweet, usermail}) => {
  const [currentScreen, setCurrentScreen] = useState("screen1")
  const [startTime, setStartTime] = useState(Date.now())
  const nextScreen = (e) => setCurrentScreen(e.target.value)
  const handleBack = (e) => {
    let sourceScreen = e.target.value
    if (sourceScreen == "screen3"){
      setAbuse(null)
      setDisinfo(null)
      setExternal('')
      setAbusetype(abuseTypes)
      let targetScreen = narrative == "identity" ? "screen2" : "screen1"
      setCurrentScreen(targetScreen)
    }
    if (sourceScreen == "screen2"){
      setIdtype(idtypes)
      setStereotype(stereotypelist)
      setCurrentScreen("screen1")
    }
  }
  const handleSubmit = () => {
    getNext({
      coder: usermail,
      tweetId:currentTweet.id,
      username: currentTweet.name,
      isRelated,
      stance,
      narrative,
      idtype: idtype.filter(x => x.isChecked).map(y => y.label),
      stereotypes: stereotype.filter(x => x.isChecked).map(y => y.label),
      abuse,
      abusetypes: abusetype.filter(x => x.isChecked).map(y => y.label),
      disinfo,
      external,
      secondsTaken: Math.floor((Date.now()-startTime)/1000),
      displayUrl: `https://tweetmarker-4d5a9.web.app/tweetdisplay/${currentTweet.id}`
    })
    return
  }
  const [isRelated, setIsRelated] = useState(null)
  const [stance, setStance] = useState(null)
  const [narrative, setNarrative] = useState(null)
  const [idtype, setIdtype] = useState(idtypes)
  const [stereotype, setStereotype] = useState(stereotypelist)
  const [abuse, setAbuse] = useState(null)
  const [disinfo, setDisinfo] = useState(null)
  const [abusetype, setAbusetype] = useState(abuseTypes)
  const [external, setExternal] = useState('')
  const handleIdChange = (e) => setIdtype(idtype.map(idt => idt.name == e.target.name ? {...idt, isChecked: e.target.checked} : idt))
  const handleStereotype = (e) => setStereotype(stereotype.map(s => s.name == e.target.name ? {...s, isChecked:e.target.checked} : s))
  const handleAbuse = (e) => setAbusetype(abusetype.map(a => a.name == e.target.name ? {...a, isChecked:e.target.checked} : a))
  useEffect(() => {
    setStereotype(filterStereotypes(stereotypelist, idtype))
  }, [idtype])
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'right',
        }}
      >
      {currentScreen =="screen1" && <ScreenOne candidateName={currentTweet.name} isRelated={isRelated} narrative={narrative} stance={stance} setIsRelated={setIsRelated} handleSubmit={handleSubmit} setStance={setStance} setNarrative={setNarrative} nextScreen={nextScreen} />}
      {currentScreen == "screen2" && <ScreenTwo handleBack={handleBack} idType={idtype} handleIdChange={handleIdChange} stereotype={stereotype} handleStereotype={handleStereotype} nextScreen={nextScreen} />}
      {currentScreen == "screen3" && <ScreenThree handleBack={handleBack} setAbuse={setAbuse} abuse={abuse} abusetype={abusetype} handleAbuse={handleAbuse} setDisinfo={setDisinfo} disinfo={disinfo} setExternal={setExternal} external={external} handleSubmit={handleSubmit} />}
      </Box>
    </Container>
  );
}
export default FormArea
