import React, { PropTypes } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form/immutable';
import { TextInput, TextArea } from 'components/shared/form';

const CreateProjectForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <h3>Create Project:</h3>
    <Field
      name="name"
      component={TextInput}
      type="text"
      placeholder="Project Name"
    />
    <div>Goals</div>
    <Field name="goals" component={TextArea} rows="5" />
    <div>Description</div>
    <Field name="description" component={TextArea} rows="5" />
    <Field
      name="topics"
      component={TextInput}
      type="text"
      placeholder="Topics"
    />
    <FormGroup>
      <Field
        name="repoAccess"
        component="input"
        type="radio"
        value="public"
      /> Public
      <div></div>
      <Field
        name="repoAccess"
        component="input"
        type="radio"
        value="private"
      /> Private
    </FormGroup>
    <FormGroup>
      <Field
        name="repoPushVote"
        component="input"
        type="radio"
        value="pushVote"
      /> Vote For Push
      <div></div>
      <Field
        name="repoPushVote"
        component="input"
        type="radio"
        value="standard"
      /> Standard
    </FormGroup>
    <Button type="submit">Create Repository</Button>
  </form>
)

CreateProjectForm.propTypes = {
  handleSubmit: PropTypes.func,
}

export default reduxForm({
  form: 'createProject',
})(CreateProjectForm);
