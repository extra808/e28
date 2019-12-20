<template>
	<main>
		<div>
			<form action method='post' novalidate @submit.prevent='questionSubmit'>
				<fieldset>
					<legend>
						<h1>Ask a Question</h1>
					</legend>
					<div>
						<label for='qname'>Name</label>
						<input type='text' name='name' id='qname' autocomplete='name' v-model.lazy='q.name' />
					</div>
					<div>
						<label for='qemail' :class='{ "form-input-error": $v.q.email.$error }'>
							Email Address
							<span v-if='$v.q.email.$error'>is required</span>
						</label>
						<input
							type='email'
							name='email'
							id='qemail'
							autocomplete='email'
							:class='{ "form-input-error": $v.q.email.$error }'
							v-model.lazy='$v.q.email.$model'
						/>
					</div>
					<div>
						<label for='qquestion' :class='{ "form-input-error": $v.q.question.$error }'>
							Question
							<span v-if='$v.q.question.$error'>is required, at least 4 letters</span>
						</label>
						<textarea
							name='question'
							id='qquestion'
							cols='30'
							rows='10'
							:class='{ "form-input-error": $v.q.question.$error }'
							v-model.lazy='$v.q.question.$model'
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
		</div>
		<div class='question-thanks' :aria-hidden='lastQuestionEmail' aria-live='polite'>
			<h2>Thank you for your question</h2>
		</div>
		<div class='question' :aria-hidden='lastQuestionEmail'>
			<p>
				<span class='last-question-label'>Date</span>
				{{ lastQuestionDate }}
			</p>
			<p v-if='lastQuestion.name'>
				<span class='last-question-label'>Name</span>
				{{ lastQuestion.name }}
			</p>
			<p>
				<span class='last-question-label'>Email</span>
				{{ lastQuestion.email }}
			</p>
			<p class='last-question-label'>Question</p>
			<p class='show-question'>{{ lastQuestion.question }}</p>
		</div>
	</main>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';

const qTemplate = {
	name: '',
	email: '',
	question: ''
};

export default {
	name: 'QuestionPage',
	data() {
		return {
			lastQuestion: {},
			q: {
				name: '',
				email: '',
				question: ''
			},
			hasErrors: false
		};
	},
	computed: {
		lastQuestionEmail() {
			return !this.lastQuestion.email;
		},
		lastQuestionDate() {
			if (!this.lastQuestionEmail) {
				const options = {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				};
				return this.lastQuestion.date.toLocaleDateString('en-US', options);
			} else {
				return '';
			}
		}
	},
	methods: {
		questionSubmit() {
			this.$v.$touch();
			if (this.$v.$anyError) {
				this.hasErrors = true;
			} else {
				// submit
				this.$store.dispatch('setQuestionData', this.q);
				// reset
				this.$v.$reset();
				this.hasErrors = false;
				this.q = qTemplate;
				// retrieve submitted question
				this.lastQuestion = this.$store.getters.getLastQuestion;
			}
		}
	},
	validations: {
		q: {
			email: {
				required,
				email
			},
			question: {
				required,
				minLength: minLength(4)
			}
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

textarea,
input[type='text'],
input[type='email'] {
	width: 100%;
	max-width: 50ch;
}

.global-error {
	color: var(--color-error);
}

.global-error[aria-hidden],
.question-thanks[aria-hidden],
.question[aria-hidden] {
	visibility: hidden;
}

.last-question-label {
	font-weight: 700;
}

span.last-question-label {
	display: inline-block;
	min-width: 6ch;
}
.show-question {
	white-space: pre-wrap;
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
