import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Popup } from 'semantic-ui-react'

class Attack extends Component {
  render(){
    let { active, activeAttack, defaultAttack, execute, exportAttack, favoriteAttack, index, toggleActive, toggleEdit, updateInput } = this.props
    return(
      <div className='ui segment'>
        <div
          onClick={() => {toggleActive(defaultAttack)}}
          className={`ui grid title ${active ? 'active' : ''}`}
        >
          <div className='four wide column'>
            <h4 className="capitalize">{defaultAttack.name}</h4>
          </div>
          <div className='eleven wide column'>
            <span>{defaultAttack.description}</span>
          </div>
          <div className='one wide column' onClick={() =>{toggleActive(defaultAttack); favoriteAttack(defaultAttack);}}>
            <Icon name={`star${defaultAttack.favorite ? '' : ' outline'}`} />
          </div>
        </div>

        <div className={`ui content segment secondary segments ${active ? 'active' : ''}`}>
          {Object.values(defaultAttack.inputs).map((input, indx)=>(
            <div key={`attack_${index}_input_${indx}`} className='ui secondary segment grid' >
              <div className='six wide column'>
                <label>{input.name}: </label>
                <input
                  className='ui input'
                  type={input.type || 'text'}
                  onChange={(event)=>{
                    updateInput({
                      attackId: defaultAttack.id,
                      name: input.name,
                      value: event.target.value,
                      valid: event.target.checkValidity()
                    })
                  }}
                  defaultValue={input.defaultValue || ''}
                  style={{width:"90%"}}
                />
              </div>
              <div className='ten wide column'>
                <span>{input.description}</span>
              </div>
            </div>
          ))}

          <div className='ui secondary segment'>
            <Popup trigger={<Button
                disabled={activeAttack.inputs && Object.values(activeAttack.inputs).some((input)=>{if(input.value === input.defaultValue) {return false}; return !input.valid })}
                onClick={()=>{execute(activeAttack)}}
                icon="bomb"
              ></Button>}
              content="Execute Attack"
            />
            <Popup trigger={<Button
                onClick={()=>{toggleEdit(activeAttack)}}
                icon="edit"
              ></Button>}
              content="Edit Attack"
            />
            <Popup trigger={<Button
                onClick={()=>{exportAttack(activeAttack)}}
                icon="download"
              ></Button>}
              content="Export Attack"
            />
          </div>
        </div>
      </div>
    )
  }
}

Attack.propTypes = {
  index: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  activeAttack: PropTypes.object,
  defaultAttack: PropTypes.object.isRequired,
  favoriteAttack: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  updateInput: PropTypes.func.isRequired,
  execute: PropTypes.func.isRequired
}

export default Attack
