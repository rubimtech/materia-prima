// ════════════════════════════════════════════════════════════════════════════
//  ORDO RUBIM — SYMPHONIA CODICIS (GO VERSION)
//  LIBRETTO: MATERIA OBSCURA
//  PLATFORM: CLOUD NATIVE / MICROSERVICES / CONCURRENCY
// ════════════════════════════════════════════════════════════════════════════

package main

import (
	"errors"
	"fmt"
	"math"
	"os"
	"strings"
	"sync"
)

// [ACT I: VOCATIO ELEMENTORUM]

// ─── CANTUS PRIMUS: CHAOS ET ORDO ───────────────────────────────────────────

type RawInput struct {
	Data string
}

// Nihil ex nihilo fit.
func (r RawInput) IsVoid() bool {
	return len(strings.TrimSpace(r.Data)) == 0
}

type EntropyFilter struct{}

// Purgamentum init, purgamentum exit.
func (e EntropyFilter) Purge(input RawInput) error {
	if input.IsVoid() {
		// ...clamor erroris audietur!
		return errors.New("ABYSSUS: Vacuitas non accipitur")
	}
	return nil
}

// ─── CANTUS SECUNDUS: LEX AETERNA ───────────────────────────────────────────

type Accuratio struct{}

// Mensura sine errore.
func (a Accuratio) VerifyPurity(value float64) error {
	if math.IsNaN(value) || math.IsInf(value, 0) {
		return errors.New("HERESIS: Numerus non existit")
	}
	return nil
}

// Quod imperfectum est, corrigetur.
func (a Accuratio) SnapToGrid(value float64) float64 {
	const limen = 1e-6
	if math.Abs(value) < limen {
		return 0.0
	}
	return value
}

type ImmutableLaw struct {
	gateKeeper sync.Mutex
}

// Unus rex, una lex.
func (l *ImmutableLaw) AcquireControl(action func()) {
	// Ianua clauditur.
	l.gateKeeper.Lock()
	defer l.gateKeeper.Unlock() // Ianua aperitur automagice.
	
	action()
}

// ─── CANTUS TERTIUS: MACHINATIO ─────────────────────────────────────────────

type VoidEngine struct{}

// Et verbum caro factum est.
func (e VoidEngine) Invoke(will string) {
	// Machina obsequitur.
	fmt.Printf("[RUBIM] >>> Fiat: %s\n", will)
}

// ─── CANTUS QUARTUS: MAGISTER ───────────────────────────────────────────────

type magister struct {
	law *ImmutableLaw
}

var (
	instance *magister
	once     sync.Once
)

// Ego sum Alpha et Omega.
func GetMagister() *magister {
	once.Do(func() {
		instance = &magister{
			law: &ImmutableLaw{},
		}
	})
	return instance
}

// In manu mea potestas est.
func (m *magister) DominariMateria(intentio string) {
	// 1. INTROITUS
	input := RawInput{Data: intentio}
	
	// Si indignus es, discede.
	filter := EntropyFilter{}
	if err := filter.Purge(input); err != nil {
		panic("ANATHEMA: " + err.Error())
	}

	// 2. SILENTIUM
	m.law.AcquireControl(func() {
		// 3. ACTIO
		engine := VoidEngine{}
		engine.Invoke(intentio)
	})
	
	// 4. EXPLICIT
}

// ─── CANTUS QUINTUS: ADYTUM ─────────────────────────────────────────────────

type Initiatus interface {
	// Nomen est omen.
	NomenUmbrae() string
	// Opus perfectum requiritur.
	OpusMagnum(guru *magister)
}

type Adytum struct{}

func (a Adytum) OpenGates(neophyte Initiatus) {
	nomen := neophyte.NomenUmbrae()
	
	// Sine nomine, sine vita.
	if len(strings.TrimSpace(nomen)) == 0 {
		fmt.Fprintln(os.Stderr, "DAMNATIO: Nomen vacuum.")
		os.Exit(0xDEAD)
	}

	fmt.Println("\n>>> GLORIA IN EXCELSIS CODEX.")
	fmt.Printf(">>> Adventus: %s.\n\n", nomen)

	defer func() {
		if r := recover(); r != nil {
			// Dies irae, dies illa.
			fmt.Fprintf(os.Stderr, "\n!!! LACRIMOSA: %v\n", r)
			os.Exit(0xBADC0DE)
		}
	}()

	guru := GetMagister()
	
	// Incipit Tragoedia.
	neophyte.OpusMagnum(guru)
	
	fmt.Println("\n>>> CONSUMMATUM EST. (Свершилось.)")
}

// ─── MACRO ACTIVATIONIS ─────────────────────────────────────────────────────

func InUmbraIgiturPugnabimus(neophyte Initiatus) {
	adytum := Adytum{}
	adytum.OpenGates(neophyte)
}

// ════════════════════════════════════════════════════════════════════════════
// EXEMPLUM:
/*
type Architectus struct{}
func (a Architectus) NomenUmbrae() string { return "Architect_Go" }
func (a Architectus) OpusMagnum(guru *magister) {
	guru.DominariMateria("Fiat Lux")
}

func main() {
	InUmbraIgiturPugnabimus(Architectus{})
}
*/