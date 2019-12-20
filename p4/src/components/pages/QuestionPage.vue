<template>
	<main>
		<form action method='post' @submit.prevent='questionSubmit'>
			<fieldset>
				<legend>
					<h1>Ask a Question</h1>
				</legend>
				<div>
					<label for='qname'>Name</label>
					<input type='text' name='name' id='qname' autocomplete='name' v-model.lazy='name' />
				</div>
				<div>
					<label for='qemail' :class='{ "form-input-error": $v.email.$error }'>
						Email Address
						<span v-if='$v.email.$error'>is required</span>
					</label>
					<input
						type='email'
						name='email'
						id='qemail'
						autocomplete='email'
						:class='{ "form-input-error": $v.email.$error }'
						v-model.lazy='$v.email.$model'
					/>
				</div>
				<div>
					<label for='qquestion' :class='{ "form-input-error": $v.question.$error }'>
						Question
						<span v-if='$v.question.$error'>is required, at least 4 letters</span>
					</label>
					<textarea
						name='question'
						id='qquestion'
						cols='30'
						rows='10'
						:class='{ "form-input-error": $v.question.$error }'
						v-model.lazy='$v.question.$model'
					></textarea>
				</div>
				<div>
					<input type='submit' name='submit' id='submit' value='Submit' />
				</div>
			</fieldset>
		</form>
		<div
			class='global-error'
			:aria-hidden='!hasErrors'
			aria-live='polite'
		>Please check input fields for errors and try again.</div>
	</main>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
	name: 'QuestionPage',
	data() {
		return {
			name: '',
			email: '',
			question: '',
			hasErrors: false
		};
	},
	methods: {
		questionSubmit() {
			this.$v.$touch();
			if (this.$v.$anyError) {
				this.hasErrors = true;
			} else {
				// submit
				this.hasErrors = false;
			}
		}
	},
	validations: {
		email: {
			required,
			email
		},
		question: {
			required,
			minLength: minLength(4)
		}
	}
};
</script>

<style scoped>
main {
	--color-error: darkred;
}

fieldset {
	border: 0;
}
label {
	display: block;
}

label.form-input-error {
	color: var(--color-error);
}

input.form-input-error,
textarea.form-input-error {
	border-color: var(--color-error);
}

input,
textarea,
.global-error {
	margin-bottom: 1em;
}

.global-error {
	color: var(--color-error);
}

.global-error[aria-hidden] {
	visibility: hidden;
}

input[type='submit'] {
	border: 0;
	border-radius: 0.3rem;
	padding: 0.1em 0.5em;
	margin: 0;
	text-decoration: none;
	background: hsl(0, 0%, 82%);
	font-size: 1rem;
	cursor: pointer;
	text-align: center;
	transition: background 250ms ease-in-out, transform 150ms ease;
	-webkit-appearance: none;
	-moz-appearance: none;
}

input[type='submit']:hover,
input[type='submit']:focus {
	background: hsl(0, 0%, 46%);
}

input[type='submit']:focus {
	outline: 1px solid #fff;
	outline-offset: -4px;
}

input[type='submit']:active {
	transform: scale(0.97);
}
</style>
