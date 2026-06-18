---
publishDate: 2024-01-24T00:00:00Z
title: AngularJS and Modern Angular - A Tale of Coexistence
description: Explore the coexistence of AngularJS and modern Angular in web development. This article discusses the challenges and solutions for integrating modern Angular within the framework of existing AngularJS applications, with a practical demonstration using a ToDo MVC project.
excerpt: Despite AngularJS being deprecated, its usage persists in the industry. This article delves into the intriguing coexistence of AngularJS and its successor, Angular 2+, and provides a practical guide on how these two frameworks can operate side-by-side and share state seamlessly.
image: /images/angularjs-angular17.webp
tags:
  - Web Development
  - JavaScript
  - Angular
  - AngularJS
  - Angular Signals
  - Frontend Frameworks
  - Migration
  - Legacy Systems
  - Web Components
  - State Management
  - Angular Elements
  - Custom Elements
  - ToDo MVC
  - Code Integration
  - Software Architecture
---

[TL;DR Just Show Me The Demo](#practical-demonstration-todo-mvc-project)

_UPDATE (June 2026): This post was originally written for Angular 17. The demo and code samples are now updated to Angular 22. The integration technique is unchanged, but the component code now uses signal-based `input()`/`output()` and `effect()` in place of `@Input`/`@Output` and `ngOnChanges`._

In the web development landscape, technologies evolve rapidly, leaving a trail of legacy systems in their wake. AngularJS, despite being deprecated several years ago, has continued to exhibit remarkable resilience. Its popularity, evidenced by weekly download rates hovering around half a million until recently, signifies a persistent presence in the industry. This enduring usage of AngularJS is juxtaposed with the rising popularity of its successor, Angular 2+.

![A chart showing weekly NPM downloads for AngularJS and Angular Core](/images/angular-trends.webp)

This intriguing coexistence raises a pertinent question: How do developers integrate modern Angular within the framework of existing AngularJS applications, especially when a complete update of the latter is not viable in production? I recently encountered this challenge in a work project and devised a solution that enabled these two frameworks to operate side-by-side and seamlessly share states.

## The Challenge of Integration

The core challenge was embedding a modern Angular application within an AngularJS application without altering the latter. The solution I crafted involves compiling the Angular application as a custom element, also known as a web component. This approach effectively minifies the Angular framework, transforming it into an embeddable element compatible with JavaScript environments. Angular Elements are components packaged as custom elements, a web standard for defining new HTML elements in a framework-agnostic way. This means that Angular Elements are essentially just Angular components. Still, they can be used outside the Angular ecosystem, such as in a React or Vue.js application or even within AngularJS.

## Technical Approach and Considerations

The process necessitates several technical adjustments:

- **Configuration of Modern Angular:** The application must be configured to function as a custom element.
- **Build Process Alterations:** The build process for custom elements needs modification to prevent output hashing. This ensures the generation of a static, consistently named bundle, facilitating the inclusion of JavaScript bundles in the AngularJS application.
- **Data Synchronization:** Establishing a communication channel between AngularJS and modern Angular is crucial. This is achievable through a directive that binds the input and output data from the Angular custom element to AngularJS, ensuring state consistency between the two frameworks.

### Configuring modern Angular as a custom element

1. **Creating the Angular Component**: You start by creating an Angular component as usual. This component can have inputs and outputs and use any Angular features you need.

2. **Packaging as an Angular Element**: Next, you package the component as a custom element. This is done using the `createCustomElement` function from the `@angular/elements` package. This function takes an Angular component and returns a JavaScript class that can be used as a custom element.

3. **Registering the Custom Element**: Finally, you register the custom element with the browser's custom elements registry. This is done using the `customElements.define` method. Once the custom element is registered, you can use it just like any other HTML element.

A full explanation of creating a custom element is beyond the scope of this article, but there is [an excellent guide here.](https://blog.bitsrc.io/diving-deep-into-angular-elements-c17a868d6894)

### Build Process Alterations

In a typical Angular build process, the Angular CLI compiles your TypeScript code into JavaScript and then bundles and minifies it for optimal performance. This process also includes "hashing" the names of the output files. Hashing is a technique used to cache-bust the files, meaning that each new build generates a unique filename, ensuring that the browser fetches the latest version of the file and doesn't serve an outdated cached version.

Here's a simplified view of a typical Angular build process:

1. **TypeScript Compilation**: The TypeScript code is compiled into JavaScript.
2. **Bundling**: The JavaScript files are bundled together, reducing the number of files that must be fetched.
3. **Minification**: The JavaScript code is minified, removing unnecessary characters to reduce file size.
4. **Hashing**: The output files are named with a unique hash to prevent caching issues.

In a typical Angular application, the entry point would be `index.html`, and the framework would automatically add the hashed JS bundles.
However, when integrating an Angular application into an existing AngularJS application, we need to make some alterations to this process. Specifically, we need to turn off the output hashing. This is because we need a consistently named JavaScript bundle to be referenced and loaded into the AngularJS application. It's possible to inject the new hashed script bundles dynamically, but this would require additional scripting, and in the spirit of keeping things simple, we are skipping it.

Here's how the modified build process looks:

1. **TypeScript Compilation**: The TypeScript code is compiled into JavaScript.
2. **Bundling**: The JavaScript files are bundled together, reducing the number of files that must be fetched.
3. **Minification**: The JavaScript code is minified, removing unnecessary characters to reduce file size.
4. **No Hashing**: The output files are named consistently without a unique hash. This allows the AngularJS application to reference and load the same file name with each new build.
5. **Add the bundles to AngularJS**: You must add the bundles to the AngularJS `index.html` entry point.

This modification can be achieved by adjusting the build configuration in the `angular.json` file and setting the `outputHashing` option to `none`. This ensures the generation of a static, consistently named bundle, facilitating the inclusion of JavaScript bundles in the AngularJS application.

We also can't use the standard `ng serve` to develop our application. Instead, we can change the `start` script in `package.json` to `ng build --output-path=angularjs/bundles --watch --output-hashing=none --source-map=true`. The `watch` flag recompiles the application once a file is updated. Recompilation is very fast, usually under 1 second, in my experience.

Then, we add the path to the compiled bundles to our AngularJS `index.html` entry point.

<a name="practical-demonstration-todo-mvc-project"></a>

## Practical Demonstration: ToDo MVC Project

To illustrate this integration, I used a project named ToDo MVC. Although this project, designed to showcase various front-end frameworks, has not been updated for several years, it served as an ideal base for demonstrating the coexistence of AngularJS and modern Angular. Within the ToDo MVC application, I embedded an Angular custom element running the same application but constructed in Angular 22. This setup allowed for seamless state synchronization between the two versions.

In the example below, the Angular 22 application is running inside of the AngularJS application. They have completely syncronized state; update one, the other reacts. The only aspect not synced are the status filters, demonstrating that the two applications can be as independent as desired.

<iframe src="https://johnfewell.github.io/angularjs-modern-angular/#!/" width="100%" height="700"></iframe>

[GitHub Repository](https://github.com/johnfewell/angularjs-modern-angular)

### Enabling state sharing

#### AngularJS Directive

To enable the sharing of state between the two applications, we need to enable two-way binding. This is accomplished by using an AngularJS directive. Let's take a look:

```javascript
angular.module('todomvc').directive('modernAngularApp', [
  function () {
    return {
      restrict: 'E',
      scope: {
        state: '=',
        onNotify: '&',
      },
      link: function (scope, element) {
        scope.$watch('state', function (newVal) {
          element[0].state = newVal;
        });

        element.on('notify', function (event) {
          const message = event.detail;
          scope.$apply(function () {
            scope.onNotify({ message: message });
          });
        });
      },
    };
  },
]);
```

Here's a breakdown of the code:

- `directive("modernAngularApp"`: This looks for the name of the Angular custom element we created. In this case, it will look for the element name `modern-angular-app` in the DOM.

- `restrict: "E"` means the directive is restricted to only being activated when it is used as an element.

- `scope: { state: "=", onNotify: "&" }`: This creates an isolated scope for the directive. The `state` property is a two-way binding, meaning changes in the parent scope and the directive's scope reflect each other. With AngularJS 1.5 and above, one-way binding is supported.
- The `onNotify` property is a method binding, which allows the directive to execute a function in the parent scope.

- `link: function (scope, element) {...}`: The link function is where you put all the directive's logic. It is executed once the directive has been compiled and linked by AngularJS.

- `scope.$watch("state", function (newVal) {...})`: This sets up a watcher on the `state` property of the scope. When the state changes, the function is called with the new value.

- `element.on("notify", function (event) {...})`: This sets up an event listener on the `notify` event. When the `notify` event is fired, the function is called with the event object.

In summary, the purpose of this directive is to watch a `state` property and update an element's state when it changes, listen for a `notify` event, and call a function in the parent scope when it happens.

#### Add Angular Custom Element

The script tags for the custom element must be included in the HTML file:

```html
<script src="bundles/browser/polyfills.js" type="module"></script>
<script src="bundles/browser/main.js" type="module"></script>
<link rel="stylesheet" href="bundles/browser/styles.css" />
```

In the HTML file of our AngularJS application, we can then reference the Angular custom element and add the binding functions:

```html
<modern-angular-app
  state="stateObject"
  on-notify="handleNotifyStateChange(message)"
></modern-angular-app>
```

AngularJS's `stateObject` will be passed to the custom element as an input called `state`. This functions as the state input for the custom element. The `onNotify` function fires whenever the Angular custom element emits a new state value.

#### Setting up the Angular Custom Element

```typescript
export class AppComponent {
  private todoService = inject(TodoService);

  state = input<Todo[] | string>([]);
  notify = output<Todo[]>();
```

Here, we have two signal-based properties (this is where the original Angular 17 version of this post used the `@Input` and `@Output` decorators):

1. **state**: A signal input created with the `input()` function. Calling `this.state()` returns the latest value the parent has pushed in. The type is `Todo[] | string` because of an AngularJS quirk we'll handle below.

2. **notify**: An output created with the `output()` function. It raises custom events carrying an array of Todo objects that can be listened to by a parent (or, packaged as a custom element, by anything in the DOM).

The synchronization logic lives in two `effect()`s in the constructor. The first handles inbound changes: it replaces the `ngOnChanges` lifecycle hook from the original version of this post:

```typescript
  constructor() {
    // Inbound: AngularJS pushed a new state object into the element.
    effect(() => {
      const value = this.state();
      // Before AngularJS's first digest cycle, the bound attribute arrives
      // as the literal string 'stateObject' rather than the object.
      if (value === 'stateObject' || value === undefined) return;

      const result = z.array(TodoSchema).safeParse(value);
      if (result.success) {
        setTodos(result.data);
      } else {
        console.error('Invalid todo schema:', result.error);
      }
    });
```

Because the effect reads `this.state()`, it automatically re-runs every time AngularJS pushes a new value into the element. The digest-cycle quirk from the original post is still with us: when the element is first compiled, the `state` attribute arrives as the literal string `'stateObject'`, and we only get the actual object on the next digest cycle, hence the guard (and the `Todo[] | string` input type). Once we have a real value, it's parsed as an array of `Todo` objects using the zod library. If the parsing is successful, it updates the todos in the repository by calling `setTodos`; if it fails, it logs an error.

The second effect handles outbound changes: it replaces the constructor's `todos$` subscription:

```typescript
    // Outbound: notify AngularJS when our store diverges from the state it
    // last gave us. untracked() means only store changes re-run this effect.
    effect(() => {
      const todos = this.todoService.todos();
      if (!deepEqual(untracked(this.state), todos)) {
        this.notify.emit(todos);
      }
    });
  }
}
```

Whenever the todo store changes, this effect checks whether the new state differs from the state AngularJS last gave us, and emits it through `notify` if so. Note the `untracked()` wrapper around `state`: we want to _read_ the input for the comparison without making it a dependency of the effect. Otherwise inbound updates from AngularJS would also re-trigger the outbound check. This is exactly the kind of dependency control that `ngOnChanges` and manual subscriptions made awkward.

The `on-notify` attribute in the HTML element corresponds to the `notify` output in the Angular component.

In Angular, the convention is to prefix output bindings with `on-` in the template to indicate that it's an event handler. This is similar to how native DOM events like click are handled with methods like `onclick`.

So, in the HTML element, `on-notify` is the event handler that listens for the notify event emitted by the `modern-angular-app` element. When the `notify` event is emitted, the `handleNotifyStateChange(message)` function is called.

In the component, `notify` is the output that emits the event, and Angular Elements dispatches it as a DOM custom event.

## Performance Insights

An analysis of the package sizes revealed a negligible difference between the two frameworks. As of the Angular 22 update, the entire modern Angular bundle for this demo (main + polyfills) transfers around 80kb compressed, still in the same ballpark as the AngularJS payload it sits inside.
